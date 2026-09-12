// @vitest-environment node
import type { Context } from "hono";

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  testFilePostContentType,
  testPostContentType,
} from "@/tests/content-fixtures";
import { runtimeImports } from "@/tests/import-graph";

import type { ContentAdvancedStore } from "./advanced-store";

import {
  createContentPublicRowHydrator,
  nestContentPublicRow,
} from "./public-row-hydration";

const here = dirname(fileURLToPath(import.meta.url));

const order: string[] = [];

const loadMany = vi.fn(
  async (
    itemIds: readonly number[],
    _db: unknown,
    only?: readonly string[],
  ) => {
    order.push("collections");

    return Promise.resolve(
      new Map(
        itemIds.map(id => [
          id,
          Object.fromEntries((only ?? []).map(field => [field, [id * 10]])),
        ]),
      ),
    );
  },
);

const advanced = { loadMany } as unknown as ContentAdvancedStore;

const resolveFiles = vi.fn(
  async (
    _c: Context,
    _definition: unknown,
    rows: Record<string, unknown>[],
  ) => {
    order.push("files");

    return Promise.resolve(rows.map(row => ({ ...row, hydrated: true })));
  },
);

vi.mock("./files", () => ({
  resolveContentPublicRowFiles: async (
    ...args: Parameters<typeof resolveFiles>
  ) => resolveFiles(...args),
}));

const c = {
  get: (key: string) => (key === "db" ? "db-handle" : undefined),
} as Context;

beforeEach(() => {
  order.length = 0;
  loadMany.mockClear();
  resolveFiles.mockClear();
});

const hydrator = (publicCollections: readonly string[]) =>
  createContentPublicRowHydrator({
    advanced,
    c,
    definition: testPostContentType,
    publicCollections,
  });

describe("nesting", () => {
  it("puts a group's leaves back under their owner", () => {
    expect(
      nestContentPublicRow({ "seo.title": "T", id: 1, "seo.description": "D" }),
    ).toEqual({ id: 1, seo: { description: "D", title: "T" } });
  });

  it("leaves a flat column alone", () => {
    expect(nestContentPublicRow({ id: 1, title: "Hello" })).toEqual({
      id: 1,
      title: "Hello",
    });
  });

  it("runs first, so a nested id is what the collections are keyed by", async () => {
    await hydrator(["tags"])([{ "seo.title": "T", id: 4 }]);

    expect(loadMany).toHaveBeenCalledWith([4], "db-handle", ["tags"]);
  });
});

describe("an empty list", () => {
  it("loads nothing at all", async () => {
    await expect(hydrator(["tags"])([])).resolves.toEqual([]);

    expect(loadMany).not.toHaveBeenCalled();
    expect(resolveFiles).not.toHaveBeenCalled();
  });

  it("short-circuits even when there is nothing to load either", async () => {
    await expect(hydrator([])([])).resolves.toEqual([]);

    expect(order).toEqual([]);
  });
});

describe("the collections", () => {
  it("load only when the allowlist exposes one", async () => {
    await hydrator([])([{ id: 1 }]);

    expect(loadMany).not.toHaveBeenCalled();
  });

  it("load exactly the exposed fields and nothing more", async () => {
    await hydrator(["tags", "related"])([{ id: 1 }, { id: 2 }]);

    expect(loadMany).toHaveBeenCalledTimes(1);
    expect(loadMany.mock.calls[0][0]).toEqual([1, 2]);
    expect(loadMany.mock.calls[0][2]).toEqual(["tags", "related"]);
  });

  it("attach to the row they belong to", async () => {
    const rows = await hydrator(["tags"])([{ id: 1 }, { id: 2 }]);

    expect(rows[0]).toMatchObject({ id: 1, tags: [10] });
    expect(rows[1]).toMatchObject({ id: 2, tags: [20] });
  });

  it("skip a row with no numeric id rather than mis-keying it", async () => {
    const rows = await hydrator(["tags"])([{ id: "not-a-number" }]);

    expect(loadMany.mock.calls[0][0]).toEqual([]);
    expect(rows[0]).not.toHaveProperty("tags");
  });
});

describe("the file fields", () => {
  it("resolve after the collections are attached", async () => {
    await hydrator(["tags"])([{ id: 1 }]);

    // A `multiple: true` file field has no column: its identifiers only exist
    // on the row once `loadMany` has put them there.
    expect(order).toEqual(["collections", "files"]);
  });

  it("resolve on the rows the collections were merged into", async () => {
    await hydrator(["tags"])([{ id: 1 }]);

    expect(resolveFiles.mock.calls[0][2]).toEqual([{ id: 1, tags: [10] }]);
  });

  it("still resolve when there is no collection to load", async () => {
    const rows = await hydrator([])([{ id: 1 }]);

    expect(order).toEqual(["files"]);
    expect(rows[0]).toMatchObject({ hydrated: true });
  });

  it("are handed the definition whose allowlist decides which ones are public", async () => {
    await createContentPublicRowHydrator({
      advanced,
      c,
      definition: testFilePostContentType,
      publicCollections: [],
    })([{ id: 1 }]);

    expect(resolveFiles.mock.calls[0][1]).toBe(testFilePostContentType);
  });
});

describe("both public services", () => {
  it("read their hydration out of this module rather than declaring it", () => {
    for (const file of ["public-service.ts", "localized-public-service.ts"]) {
      const source = readFileSync(join(here, file), "utf8");

      expect(runtimeImports(join(here, file))).toContain(
        "./public-row-hydration",
      );
      // The duplication this module removed: thirty-odd identical lines, twice.
      expect(source).not.toMatch(/const withCollections = async \(/);
    }
  });
});

describe("a content type with no collection store", () => {
  it("hydrates the rows without one", async () => {
    const rows = await createContentPublicRowHydrator({
      c,
      definition: testPostContentType,
      publicCollections: ["tags"],
    })([{ id: 1 }]);

    expect(rows[0]).toMatchObject({ hydrated: true, id: 1 });
    expect(order).toEqual(["files"]);
  });
});
