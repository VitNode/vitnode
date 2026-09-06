// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { runtimeImports } from "@/tests/import-graph";

const here = dirname(fileURLToPath(import.meta.url));

const SHARED = {
  filters: join(here, "filters.tsx"),
  orderHead: join(here, "order-table-head.tsx"),
  pagination: join(here, "pagination.tsx"),
  search: join(here, "search.tsx"),
  urlState: join(here, "url-state.ts"),
};

describe("the shared data table is framework-neutral", () => {
  it("keeps the URL arithmetic free of every import", () => {
    // The point of `url-state.ts`: no router, no React, nothing to mock. If an
    // import ever appears here, the seam has started growing a second job.
    expect(runtimeImports(SHARED.urlState)).toEqual([]);
  });
});

describe("the shared controls take their navigation from the seam", () => {
  const withoutComments = (path: string): string =>
    readFileSync(path, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");

  const controls = [
    SHARED.filters,
    SHARED.orderHead,
    SHARED.pagination,
    SHARED.search,
  ];

  it("asks the seam where it is rather than a router", () => {
    for (const path of controls) {
      const code = withoutComments(path);

      expect(code).toContain("useDataTableUrl");
      expect(code).not.toContain("useSearchParams");
      expect(code).not.toContain("useRouter");
      expect(code).not.toContain("usePathname");
    }
  });

  it("builds no URLs of its own", () => {
    // Every `new URLSearchParams(...)` in a control was a copy of the current
    // search about to be edited by hand. That is `url-state.ts`'s job now, and
    // a control that starts doing it again is a rule nobody can test.
    for (const path of controls) {
      expect(withoutComments(path)).not.toContain("new URLSearchParams");
    }
  });

  it("never names a pathname, because it is not given one", () => {
    for (const path of controls) {
      expect(withoutComments(path)).not.toContain("pathname");
    }
  });
});
