// @vitest-environment node
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { runtimeImports } from "@/tests/import-graph";

const requestHeaders = new Headers();

vi.mock("@tanstack/react-start/server-only", () => ({}));
vi.mock("@tanstack/react-start/server", () => ({
  getRequestHeaders: () => requestHeaders,
  getRequestIP: () => "203.0.113.9",
  getRequestUrl: () => new URL("https://app.example.com/admin"),
  setCookie: vi.fn(),
}));

const { readAdminSessionFromApi } = await import("./default-transport");
const { readAdminSessionOnApi } = await import("./server");
const { readAdminSessionThrough } = await import("./session-read");

const here = dirname(fileURLToPath(import.meta.url));

const apiFetch = vi.fn<(url: string | URL, init?: RequestInit) => Response>();

const GRANTED = { permissions: {}, user: { id: 1, name: "Tester" } };

/** A fresh answer per call, so both reads can consume the same body. */
const answers = (body: string, status: number) => {
  apiFetch.mockImplementation(() => new Response(body, { status }));
};

beforeEach(() => {
  apiFetch.mockReset();
  answers(JSON.stringify(GRANTED), 200);
  vi.stubGlobal("fetch", apiFetch);
  vi.stubEnv("VITNODE_API_URL", "http://localhost:8000");
  requestHeaders.set("cookie", "vitnode_admin_auth=abc");
});

describe("the browser read and the server one", () => {
  it.each([
    [200, { session: GRANTED, status: "granted" }],
    [403, { status: "denied" }],
    [401, { httpStatus: 401, status: "api_error" }],
    [418, { httpStatus: 418, status: "api_error" }],
    [429, { httpStatus: 429, status: "api_error" }],
  ])("agree on a %i", async (status, expected) => {
    answers(JSON.stringify(GRANTED), status);

    await expect(readAdminSessionFromApi()).resolves.toEqual(expected);
    await expect(readAdminSessionOnApi()).resolves.toEqual(expected);
  });

  /**
   * A `500` never arrives as a response at all - the fetcher throws on one with
   * the body attached - so the two reads have to agree on the raised path.
   */
  it("agree on a 500, which arrives as a throw rather than a status", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    answers("", 500);

    const fromBrowser = await readAdminSessionFromApi();

    expect(await readAdminSessionOnApi()).toEqual(fromBrowser);
    expect(fromBrowser.status).toBe("api_error");
  });

  it("agree that a failed connection is a network error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    apiFetch.mockImplementation(() => {
      throw new TypeError("fetch failed");
    });

    await expect(readAdminSessionFromApi()).resolves.toEqual({
      status: "network_error",
    });
    await expect(readAdminSessionOnApi()).resolves.toEqual({
      status: "network_error",
    });
  });

  it("agree that anything else thrown is an api error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    apiFetch.mockImplementation(() => {
      throw new Error("boom");
    });

    await expect(readAdminSessionFromApi()).resolves.toEqual({
      status: "api_error",
    });
    await expect(readAdminSessionOnApi()).resolves.toEqual({
      status: "api_error",
    });
  });

  /**
   * The body is read inside the `try`, so an unparseable `200` is a raised
   * failure and not a grant carrying nothing - the same answer both reads gave
   * before they shared one implementation.
   */
  it("agree that an unparseable 200 is a raised failure", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    answers("", 200);

    await expect(readAdminSessionFromApi()).resolves.toEqual({
      status: "api_error",
    });
    await expect(readAdminSessionOnApi()).resolves.toEqual({
      status: "api_error",
    });
  });

  it("both log the failure they could not classify away", async () => {
    const logged = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    // The spy outlives the test that installed it, so only this test's calls
    // are the ones being counted.
    logged.mockClear();
    apiFetch.mockImplementation(() => {
      throw new Error("boom");
    });

    await readAdminSessionFromApi();
    await readAdminSessionOnApi();

    const own = logged.mock.calls.filter(
      ([message]) => message === "[admin] the admin session could not be read",
    );

    expect(own).toHaveLength(2);
  });

  it("never throw, so a guard always reaches a decision", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    apiFetch.mockImplementation(() => {
      throw new Error("boom");
    });

    await expect(readAdminSessionFromApi()).resolves.toBeDefined();
    await expect(readAdminSessionOnApi()).resolves.toBeDefined();
  });
});

describe("the shared read", () => {
  it("ignores a body that arrived with a status carrying none", async () => {
    await expect(
      readAdminSessionThrough(async () =>
        Promise.resolve({ session: { permissions: {} }, status: 403 }),
      ),
    ).resolves.toEqual({ status: "denied" });
  });

  it("refuses to call a 200 with no body a grant", async () => {
    await expect(
      readAdminSessionThrough(async () =>
        Promise.resolve({ session: undefined, status: 200 }),
      ),
    ).resolves.toEqual({ httpStatus: 200, status: "api_error" });
  });

  it("names neither fetcher, so neither runtime is baked in", () => {
    expect(runtimeImports(join(here, "session-read.ts"))).toEqual(["./state"]);
  });
});

describe("the server read", () => {
  it("keeps the server-only boundary", () => {
    const imports = runtimeImports(join(here, "server.ts"));

    expect(imports).toContain("@tanstack/react-start/server-only");
    expect(imports).toContain("@/tanstack/fetcher/server");
  });

  it("still exports the user search under its OnApi name", async () => {
    const server = await import("./server");

    expect(server.readAdminUserSearchOnApi).toBeTypeOf("function");
  });
});

describe("the browser read", () => {
  it("imports no server-only module of its own", () => {
    const imports = runtimeImports(join(here, "default-transport.ts"));

    expect(imports).not.toContain("@/tanstack/fetcher/server");
    expect(imports).not.toContain("@tanstack/react-start/server-only");
    expect(imports.some(one => one.endsWith("/server"))).toBe(false);
  });

  it("shares its read with the server one", () => {
    for (const path of ["default-transport.ts", "server.ts"]) {
      expect(runtimeImports(join(here, path))).toContain("./session-read");
    }
  });
});
