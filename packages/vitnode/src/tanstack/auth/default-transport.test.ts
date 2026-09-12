// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const requestHeaders = new Headers();

vi.mock("@tanstack/react-start/server-only", () => ({}));
vi.mock("@tanstack/react-start/server", () => ({
  getRequestHeaders: () => requestHeaders,
  getRequestIP: () => "203.0.113.9",
  getRequestUrl: () => new URL("https://app.example.com/login"),
  setCookie: vi.fn(),
}));

const { defaultAuthTransport } = await import("./default-transport");

const apiFetch = vi.fn<(url: string | URL, init?: RequestInit) => Response>();

const lastCall = () => {
  const [url, init] = apiFetch.mock.calls.at(-1) ?? [];

  return {
    body: typeof init?.body === "string" ? JSON.parse(init.body) : undefined,
    headers: new Headers(init?.headers),
    method: init?.method,
    url: new URL(String(url)),
  };
};

const answers = (body: string, status: number) => {
  apiFetch.mockReturnValue(new Response(body, { status }));
};

beforeEach(() => {
  apiFetch.mockReset();
  answers("{}", 200);
  vi.stubGlobal("fetch", apiFetch);
  vi.stubEnv("VITNODE_API_URL", "http://localhost:8000");
  requestHeaders.set("cookie", "vitnode_auth=abc");
});

describe("the API surface the default transport calls", () => {
  it("reads the session from GET /users/session", async () => {
    answers(JSON.stringify({ user: null }), 200);

    await expect(defaultAuthTransport.readSession()).resolves.toEqual({
      user: null,
    });

    expect(lastCall().url.pathname).toBe("/api/@vitnode/core/users/session");
    expect(lastCall().method).toBe("GET");
  });

  it("signs in with POST /users/sign_in", async () => {
    answers("", 201);

    await defaultAuthTransport.signIn({
      email: "test@test.com",
      password: "Test123!",
    });

    expect(lastCall().url.pathname).toBe("/api/@vitnode/core/users/sign_in");
    expect(lastCall().method).toBe("POST");
    expect(lastCall().body).toEqual({
      email: "test@test.com",
      password: "Test123!",
    });
  });

  it("signs out with DELETE /users/sign_out, naming which session", async () => {
    answers("", 200);

    await defaultAuthTransport.signOut({ isAdmin: true });

    expect(lastCall().url.pathname).toBe("/api/@vitnode/core/users/sign_out");
    expect(lastCall().method).toBe("DELETE");
    expect(lastCall().body).toEqual({ isAdmin: true });
  });

  it("defaults sign-out to the visitor's own session", async () => {
    answers("", 200);

    await defaultAuthTransport.signOut({});

    expect(lastCall().body).toEqual({ isAdmin: false });
  });

  it("starts SSO at POST /users/sso/{providerId}", async () => {
    answers(JSON.stringify({ url: "https://provider.example/authorize" }), 200);

    await defaultAuthTransport.startSso({ providerId: "google" });

    expect(lastCall().url.pathname).toBe("/api/@vitnode/core/users/sso/google");
    expect(lastCall().method).toBe("POST");
  });

  it("completes SSO at GET /users/sso/{providerId}/callback", async () => {
    answers("", 200);

    await defaultAuthTransport.completeSso({
      code: "code-1",
      providerId: "google",
      state: "state-1",
    });

    const { url } = lastCall();

    expect(url.pathname).toBe("/api/@vitnode/core/users/sso/google/callback");
    expect(url.searchParams.get("code")).toBe("code-1");
    expect(url.searchParams.get("state")).toBe("state-1");
  });

  it("links an SSO identity at POST /users/sso/{providerId}/link", async () => {
    answers("", 201);

    await defaultAuthTransport.linkSso({
      password: "Test123!",
      providerId: "google",
      token: "a-token-long-enough",
    });

    expect(lastCall().url.pathname).toBe(
      "/api/@vitnode/core/users/sso/google/link",
    );
  });
});

describe("the captcha token the gated routes require", () => {
  it("travels with a sign-up, and never in the body", async () => {
    answers(
      JSON.stringify({ email: "test@test.com", emailVerified: false }),
      201,
    );

    await defaultAuthTransport.signUp({
      captchaToken: "captcha-1",
      email: "test@test.com",
      name: "Tester",
      password: "Test123!",
    });

    expect(lastCall().headers.get("x-vitnode-captcha-token")).toBe("captcha-1");
    expect(lastCall().body).not.toHaveProperty("captchaToken");
  });

  it("travels with a password reset request", async () => {
    answers("", 201);

    await defaultAuthTransport.requestPasswordReset({
      captchaToken: "captcha-2",
      email: "test@test.com",
    });

    expect(lastCall().headers.get("x-vitnode-captcha-token")).toBe("captcha-2");
    expect(lastCall().body).toEqual({ email: "test@test.com" });
  });
});

describe("status to result, unchanged by the transport move", () => {
  it.each([
    [201, { ok: true }],
    [403, { ok: false, reason: "access_denied" }],
    [400, { ok: false, reason: "server_error" }],
  ])("maps a %i sign-in to %o", async (status, expected) => {
    answers("", status);

    await expect(
      defaultAuthTransport.signIn({
        email: "test@test.com",
        password: "Test123!",
      }),
    ).resolves.toEqual(expected);
  });

  it("reads the link offer off a 409 SSO callback", async () => {
    answers(
      JSON.stringify({
        email: "test@test.com",
        hasPassword: true,
        linkToken: "a-token-long-enough",
      }),
      409,
    );

    await expect(
      defaultAuthTransport.completeSso({
        code: "code-1",
        providerId: "google",
        state: "state-1",
      }),
    ).resolves.toEqual({
      offer: {
        email: "test@test.com",
        hasPassword: true,
        linkToken: "a-token-long-enough",
      },
      ok: false,
      reason: "email_exists",
    });
  });

  it("reads the conflict reason off a 409 sign-up", async () => {
    answers("Email already exists", 409);

    await expect(
      defaultAuthTransport.signUp({
        captchaToken: "",
        email: "test@test.com",
        name: "Tester",
        password: "Test123!",
      }),
    ).resolves.toEqual({ ok: false, reason: "email_exists" });
  });

  it("refuses a start URL the provider did not give as http(s)", async () => {
    answers(JSON.stringify({ url: "javascript:alert(1)" }), 200);

    await expect(
      defaultAuthTransport.startSso({ providerId: "google" }),
    ).resolves.toEqual({ ok: false, reason: "server_error" });
  });
});

describe("when the API cannot be reached at all", () => {
  beforeEach(() => {
    apiFetch.mockImplementation(() => {
      throw new TypeError("fetch failed");
    });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("logs and answers server_error rather than throwing", async () => {
    await expect(
      defaultAuthTransport.signIn({
        email: "test@test.com",
        password: "Test123!",
      }),
    ).resolves.toEqual({ ok: false, reason: "server_error" });

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  it("still throws for the session, which has no usable fallback", async () => {
    await expect(defaultAuthTransport.readSession()).rejects.toThrow(
      "The session could not be read.",
    );
  });
});
