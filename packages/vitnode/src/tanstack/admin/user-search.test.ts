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

const { readAdminUserSearch } = await import("./user-search");
const { MAX_SEARCH_RESULTS } =
  await import("@/views/admin/layouts/search/constants");

const apiFetch = vi.fn<(url: string | URL, init?: RequestInit) => Response>();

const lastUrl = () => new URL(String(apiFetch.mock.calls.at(-1)?.[0]));

const answers = (body: string, status: number) => {
  apiFetch.mockReturnValue(new Response(body, { status }));
};

const EDGE = {
  avatarColor: "#123456",
  email: "test@test.com",
  id: 7,
  name: "Tester",
  nameCode: "tester",
  roleId: 3,
};

beforeEach(() => {
  apiFetch.mockReset();
  vi.stubGlobal("fetch", apiFetch);
  vi.stubEnv("VITNODE_API_URL", "http://localhost:8000");
  requestHeaders.set("cookie", "vitnode_admin_auth=abc");
});

describe("the request the palette makes", () => {
  it("asks the admin users list, which enforces the permission", async () => {
    answers(JSON.stringify({ edges: [] }), 200);

    await readAdminUserSearch("test");

    expect(lastUrl().pathname).toBe("/api/@vitnode/core/admin/users/list");
  });

  it("keeps the palette's result limit", async () => {
    answers(JSON.stringify({ edges: [] }), 200);

    await readAdminUserSearch("test");

    expect(lastUrl().searchParams.get("first")).toBe(
      String(MAX_SEARCH_RESULTS),
    );
  });

  it("sends the trimmed term", async () => {
    answers(JSON.stringify({ edges: [] }), 200);

    await readAdminUserSearch("  tester  ");

    expect(lastUrl().searchParams.get("search")).toBe("tester");
  });
});

describe("a successful answer", () => {
  it("maps an edge to exactly the five fields the palette renders", async () => {
    answers(JSON.stringify({ edges: [EDGE] }), 200);

    await expect(readAdminUserSearch("test")).resolves.toEqual([
      {
        avatarColor: "#123456",
        email: "test@test.com",
        id: 7,
        name: "Tester",
        nameCode: "tester",
      },
    ]);
  });

  it("keeps the API's order", async () => {
    answers(
      JSON.stringify({
        edges: [EDGE, { ...EDGE, id: 8, name: "Second" }],
      }),
      200,
    );

    const users = await readAdminUserSearch("test");

    expect(users.map(user => user.id)).toEqual([7, 8]);
  });
});

describe("anything short of a 200", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it.each([403, 404, 418])("answers an empty list for %i", async status => {
    answers("", status);

    await expect(readAdminUserSearch("test")).resolves.toEqual([]);
  });

  it("answers an empty list when the call throws", async () => {
    apiFetch.mockImplementation(() => {
      throw new TypeError("fetch failed");
    });

    await expect(readAdminUserSearch("test")).resolves.toEqual([]);
  });
});

describe("the input the API is protected from", () => {
  it.each([
    ["an empty term", ""],
    ["whitespace only", "   "],
    ["a term past the length limit", "x".repeat(129)],
  ])(
    "answers an empty list for %s, without calling the API",
    async (_name, term) => {
      await expect(readAdminUserSearch(term)).resolves.toEqual([]);
      expect(apiFetch).not.toHaveBeenCalled();
    },
  );

  it("accepts a term at the limit", async () => {
    answers(JSON.stringify({ edges: [] }), 200);

    await readAdminUserSearch("x".repeat(128));

    expect(apiFetch).toHaveBeenCalled();
  });
});
