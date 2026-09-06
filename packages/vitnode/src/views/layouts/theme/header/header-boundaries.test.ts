// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { externalGraph, runtimeImports } from "@/tests/import-graph";

const here = dirname(fileURLToPath(import.meta.url));
const srcRoot = resolve(here, "../../../..");

const SHARED = {
  header: join(here, "header-content.tsx"),
  languageSwitcher: join(
    srcRoot,
    "components/switchers/langs/language-switcher-content.tsx",
  ),
  /** The theme toggle, reused unchanged rather than extracted - see below. */
  themeSwitcher: join(
    srcRoot,
    "components/switchers/themes/theme-switcher.tsx",
  ),
};

const sharedEntries = Object.entries(SHARED).map(([name, path]) => ({
  name,
  path,
}));
const withoutComments = (path: string): string =>
  readFileSync(path, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");

describe("the shared header is framework-neutral", () => {
  it.each(sharedEntries)(
    "$name never reaches a server-only module",
    ({ path }) => {
      // Importing one pulls the fetcher and the whole API module graph behind
      // it. The header's one mutation - sign-out - lives in the user slot,
      // which is a prop.
      const reached = [...externalGraph(path).keys()];

      expect(reached.some(one => one.endsWith(".server"))).toBe(false);
      expect(runtimeImports(path).some(one => one.includes(".server"))).toBe(
        false,
      );
    },
  );

  it("never reaches a router", () => {
    // `@vitnode/core` renders in whatever host mounts it, so the shared header
    // reaches navigation through an injected `LinkComponent` rather than
    // through a router of its own.
    const reached = [...externalGraph(SHARED.header).keys()];

    expect(reached.some(one => one.startsWith("@tanstack/"))).toBe(false);
  });
});

describe("the shared header takes its framework parts as props", () => {
  const code = withoutComments(SHARED.header);

  it("takes its links as a component rather than importing one", () => {
    expect(code).toContain("LinkComponent");
  });

  it.each(["logo", "navigation", "languageSwitcher", "user"])(
    "asks for %s rather than resolving it",
    slot => {
      expect(code).toContain(slot);
    },
  );

  it("translates nothing itself", () => {
    // The nav labels arrive as data, resolved from the message cache. A
    // `useTranslations` here would force `core.search` into every page's
    // client provider for two words.
    expect(code).not.toContain("useTranslations");
    expect(code).not.toContain("getTranslations");
  });

  it("renders the theme switcher itself", () => {
    // Not a prop: it was already framework-neutral - the assertions above are
    // over its real import graph - so injecting it would be a prop every caller
    // has to pass and nobody gets to answer differently.
    expect(code).toContain("<ThemeSwitcher />");
  });
});

describe("the shared language switcher takes the navigation as a callback", () => {
  const code = withoutComments(SHARED.languageSwitcher);

  it("asks for a select handler rather than moving the URL itself", () => {
    expect(code).toContain("onSelect");
    expect(code).not.toContain("useRouter");
    expect(code).not.toContain("usePathname");
  });

  it("is the only copy of the dropdown", () => {
    // One copy, and this is it. A second `DropdownMenu` would mean two
    // applications rendering different markup for the same control.
    expect(code).toContain("DropdownMenu");
  });

  it("reads no URL itself, so no host has to wrap it in Suspense", () => {
    expect(code).not.toContain("usePathname");
    expect(code).not.toContain("useRouter");
    expect(code).not.toContain("React.Suspense");
  });
});
