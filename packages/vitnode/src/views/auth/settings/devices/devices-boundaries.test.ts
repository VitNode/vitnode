// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { externalGraph } from "@/tests/import-graph";

const here = dirname(fileURLToPath(import.meta.url));

const SHARED = {
  list: join(here, "devices-content.tsx"),
  query: join(here, "devices-query.ts"),
  revokeButton: join(here, "revoke-device-button.tsx"),
};

describe("the shared devices modules are framework-neutral", () => {
  it("never imports the API's own module for one plugin id", () => {
    // The fetchers need the users module's *type* to keep route literals
    // inferring; a value import would drag Hono, Drizzle and `@/database` into
    // the browser bundle of every page that lists a device.
    const reached = [...externalGraph(SHARED.query).keys()];

    expect(reached).not.toContain("drizzle-orm");
    expect(reached.some(one => one.startsWith("hono"))).toBe(false);
  });
});

describe("the shared list takes its framework parts as props", () => {
  const withoutComments = (path: string): string =>
    readFileSync(path, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");

  it("is handed the devices rather than fetching them", () => {
    const code = withoutComments(SHARED.list);

    expect(code).toContain("devices: Device[];");
    expect(code).not.toContain("useQuery");
    expect(code).not.toContain("fetcher");
  });

  it("is handed the revoke rather than importing one", () => {
    const code = withoutComments(SHARED.list);

    expect(code).toContain("onRevoke: RevokeDevice;");
  });

  it("passes the revoke down to the button rather than the button finding it", () => {
    expect(withoutComments(SHARED.revokeButton)).toContain(
      "onRevoke: RevokeDevice;",
    );
  });
});
