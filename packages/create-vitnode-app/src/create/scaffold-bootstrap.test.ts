import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const appRoot = resolve(
  import.meta.dirname,
  "../../copy-of-vitnode-app/root/src",
);

const read = (file: string): string =>
  readFileSync(join(appRoot, file), "utf8");

const withoutComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

const REMOVED = [
  ["auth", "lib/auth.ts"],
  ["the AdminCP session", "lib/admin-auth.ts"],
  ["the AdminCP user search", "lib/admin-search.ts"],
] as const;

describe("bootstrap a generated application no longer owns", () => {
  it.each(REMOVED)("scaffolds no module for %s", (_what, file) => {
    expect(existsSync(join(appRoot, file))).toBe(false);
  });

  it("leaves the router with no transport side-effect imports", () => {
    const router = withoutComments(read("router.tsx"));

    expect(router).not.toContain("./lib/auth");
    expect(router).not.toContain("./lib/admin-auth");
    expect(router).not.toMatch(/^import\s+["'][^"']+["'];?$/m);
  });

  it("renders the AdminCP shell without a user-search prop", () => {
    const shell = withoutComments(read("components/admin-shell.tsx"));

    expect(shell).not.toContain("adminUserSearchFn");
    expect(shell).not.toContain("searchUsers");
  });
});

describe("the one adapter a generated application keeps", () => {
  it("still ships lib/i18n.ts", () => {
    expect(existsSync(join(appRoot, "lib/i18n.ts"))).toBe(true);
  });

  it("is what the router reads its locale routing from", () => {
    expect(withoutComments(read("router.tsx"))).toContain('from "./lib/i18n"');
  });

  it("declares the server function, because only app source is compiled", () => {
    const i18n = read("lib/i18n.ts");

    expect(withoutComments(i18n)).toContain("createServerFn");
    expect(i18n).toContain("@vitnode/core");
  });

  it("says in the file itself why it cannot move into the package", () => {
    expect(read("lib/i18n.ts")).toContain("createServerFn");
    expect(read("lib/i18n.ts").slice(0, 1200)).toMatch(/precompiled|compiler/);
  });

  it("is the only createServerFn bootstrap left under lib/", () => {
    const declaring = ["admin-nav.ts", "content-registry.ts", "i18n.ts"].filter(
      file =>
        withoutComments(read(join("lib", file))).includes("createServerFn"),
    );

    expect(declaring).toEqual(["i18n.ts"]);
  });
});
