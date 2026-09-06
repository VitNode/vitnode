// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { externalGraph, runtimeImports } from "@/tests/import-graph";

const here = dirname(fileURLToPath(import.meta.url));

const SHARED_ENTRY = join(here, "layout-content.tsx");

describe("the shared main shell is framework-neutral", () => {
  it("never reaches a server-only module", () => {
    const reached = [...externalGraph(SHARED_ENTRY).keys()];

    expect(reached.some(one => one.endsWith(".server"))).toBe(false);
    expect(
      runtimeImports(SHARED_ENTRY).some(one => one.includes(".server")),
    ).toBe(false);
  });
});

describe("the shared main shell takes its framework parts as slots", () => {
  const withoutComments = (path: string): string =>
    readFileSync(path, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");

  const code = withoutComments(SHARED_ENTRY);

  it.each(["breadcrumb", "header", "listeners"])(
    "asks for %s rather than rendering it",
    slot => {
      expect(code).toContain(slot);
    },
  );

  it("renders the header and the notification listeners itself in neither case", () => {
    expect(code).not.toContain("HeaderLayout");
    expect(code).not.toContain("NotificationListener");
    expect(code).not.toContain("WebSocketAuthSync");
  });

  /**
   * One `<main>`, in the shell. A page under it renders its own container, not a
   * second landmark - see the note on `ThemeLayoutContent`.
   */
  it("owns the one main landmark", () => {
    expect(code.match(/<main>/g)).toHaveLength(1);
  });
});
