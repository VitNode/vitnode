// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { reachedSpecifiers, runtimeImports } from "@/tests/import-graph";

const here = dirname(fileURLToPath(import.meta.url));

const SHARED = {
  /** The framework-neutral field. */
  field: join(here, "input-roles.tsx"),
  /** The type and the search signature, with no imports at all. */
  types: join(here, "roles.ts"),
};

const read = (path: string) => readFileSync(path, "utf8");

describe("the shared role field is framework-neutral", () => {
  it("takes its translations from use-intl", () => {
    expect(reachedSpecifiers(SHARED.field)).toContain("use-intl");
  });

  it("declares its role types in a module that imports nothing", () => {
    expect(runtimeImports(SHARED.types)).toEqual([]);
  });

  it("reads RoleOption from that module rather than from a transport", () => {
    expect(read(SHARED.field)).toMatch(
      /import type \{ RoleOption, RoleSearch \} from "\.\/roles"/,
    );
  });
});

describe("the search dependency is injected, and stays injected", () => {
  it("is required on the props type", () => {
    expect(read(SHARED.field)).toMatch(/\n {2}search: RoleSearch;/);
  });

  it("has no default parameter", () => {
    // The destructured parameter, at its own indent - `search={...}` further
    // down is the prop handed to `AsyncPicker` and is not what this is about.
    const source = read(SHARED.field);

    expect(source).toMatch(/\n {2}search,\n/);
    expect(source).not.toMatch(/\n {2}search\s*=/);
  });

  it("has no fallback and no host detection", () => {
    const source = read(SHARED.field);

    expect(source).not.toContain("searchRolesLazily");
    expect(source).not.toMatch(/typeof window|process\.env|import\.meta\.env/);
  });

  it("still exports the canonical field and its two types", () => {
    // The three names a host binds to.
    expect(read(SHARED.field)).toContain("export const AutoFormRoles");
    expect(read(SHARED.types)).toContain("export interface RoleOption");
    expect(read(SHARED.types)).toContain("export type RoleSearch");
  });

  it("leaves a browser search for the host to pass, in the AdminCP's own module", () => {
    // `searchAdminRolesInBrowser` lives with the roles screen's other reads
    // rather than beside the field - which is the point: the field does not
    // know how roles are found.
    const rolesQuery = join(
      here,
      "../../../views/admin/views/core/users/roles/roles-query.ts",
    );

    expect(read(rolesQuery)).toContain(
      "export const searchAdminRolesInBrowser",
    );
  });
});

describe("a default search may not return", () => {
  it("is not replaced by a default inside the field", () => {
    // The specific regression: the tempting fix for a caller that forgot
    // `search` is a default here. That would put a transport back inside a
    // framework-neutral component and re-close the seam.
    const source = read(SHARED.field);

    expect(source).not.toMatch(/search\s*=\s*search[A-Z]/);
  });
});
