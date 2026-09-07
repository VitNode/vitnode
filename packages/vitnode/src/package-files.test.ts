import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const packageRoot = resolve(import.meta.dirname, "..");

const packageJson = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf8"),
) as { exports: Record<string, unknown> };

const npmignore = readFileSync(join(packageRoot, ".npmignore"), "utf8")
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0 && !line.startsWith("#"));

const stringLeaves = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (value === null || typeof value !== "object") return [];

  return Object.values(value).flatMap(stringLeaves);
};

const exportedStylesheets = stringLeaves(packageJson.exports)
  .filter(target => target.endsWith(".css"))
  .map(target => resolve(packageRoot, target));

const RELATIVE_IMPORT = /@import\s+["'](\.[^"']+)["']/g;

const importGraph = (): { dangling: string[]; reached: Set<string> } => {
  const reached = new Set<string>();
  const dangling: string[] = [];
  const queue = [...exportedStylesheets];

  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || reached.has(file)) continue;

    if (!existsSync(file)) {
      dangling.push(relative(packageRoot, file));
      continue;
    }

    reached.add(file);

    const source = readFileSync(file, "utf8");
    for (const [, target] of source.matchAll(RELATIVE_IMPORT)) {
      queue.push(resolve(dirname(file), target));
    }
  }

  return { dangling, reached };
};

describe("the published stylesheets", () => {
  const { dangling, reached } = importGraph();

  it("are exported at all", () => {
    expect(exportedStylesheets.length).toBeGreaterThan(0);
  });

  it("import only files that exist", () => {
    expect(dangling).toEqual([]);
  });

  it("are every one of them kept out of .npmignore", () => {
    const excluded = [...reached]
      .map(file => relative(packageRoot, file).split("\\").join("/"))
      .filter(file => !npmignore.includes(`!/${file}`));

    expect(excluded).toEqual([]);
  });
});
