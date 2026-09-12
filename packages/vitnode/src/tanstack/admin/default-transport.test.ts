// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const requestHeaders = new Headers();

vi.mock("@tanstack/react-start/server-only", () => ({}));
vi.mock("@tanstack/react-start/server", () => ({
  getRequestHeaders: () => requestHeaders,
  getRequestIP: () => "203.0.113.9",
  getRequestUrl: () => new URL("https://app.example.com/admin"),
  setCookie: vi.fn(),
}));

const { defaultAdminTransport } = await import("./default-transport");

const apiFetch = vi.fn<(url: string | URL, init?: RequestInit) => Response>();

const lastUrl = () => new URL(String(apiFetch.mock.calls.at(-1)?.[0]));

const answers = (body: string, status: number) => {
  apiFetch.mockReturnValue(new Response(body, { status }));
};

const GRANTED = {
  permissions: {},
  user: { id: 1, name: "Tester" },
};

beforeEach(() => {
  apiFetch.mockReset();
  vi.stubGlobal("fetch", apiFetch);
  vi.stubEnv("VITNODE_API_URL", "http://localhost:8000");
  requestHeaders.set("cookie", "vitnode_admin_auth=abc");
});

describe("reading the admin session with no host transport registered", () => {
  it("asks the admin session route the AdminCP has always used", async () => {
    answers(JSON.stringify(GRANTED), 200);

    await defaultAdminTransport.readAdminSession();

    expect(lastUrl().pathname).toBe("/api/@vitnode/core/admin/session");
  });

  it("grants on 200, carrying the session the API sent", async () => {
    answers(JSON.stringify(GRANTED), 200);

    await expect(defaultAdminTransport.readAdminSession()).resolves.toEqual({
      session: GRANTED,
      status: "granted",
    });
  });

  it("denies on 403 rather than reporting a failure", async () => {
    answers("", 403);

    await expect(defaultAdminTransport.readAdminSession()).resolves.toEqual({
      status: "denied",
    });
  });

  it("reports an api_error for any other status, keeping it", async () => {
    answers("", 418);

    await expect(defaultAdminTransport.readAdminSession()).resolves.toEqual({
      httpStatus: 418,
      status: "api_error",
    });
  });
});

describe("when the admin session route cannot be reached", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("reports a network_error for a failed connection", async () => {
    apiFetch.mockImplementation(() => {
      throw new TypeError("fetch failed");
    });

    await expect(defaultAdminTransport.readAdminSession()).resolves.toEqual({
      status: "network_error",
    });
  });

  it("reports an api_error for anything else thrown", async () => {
    apiFetch.mockImplementation(() => {
      throw new Error("boom");
    });

    await expect(defaultAdminTransport.readAdminSession()).resolves.toEqual({
      status: "api_error",
    });
  });

  it("never throws, so a guard always reaches a decision", async () => {
    apiFetch.mockImplementation(() => {
      throw new Error("boom");
    });

    await expect(
      defaultAdminTransport.readAdminSession(),
    ).resolves.toBeDefined();
  });
});
