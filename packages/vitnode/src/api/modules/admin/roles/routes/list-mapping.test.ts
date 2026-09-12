// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import type { RoleNameWord, RoleUsersCount } from "./list-mapping";

import { withRolesAdminListFields } from "./list-mapping";

const here = dirname(fileURLToPath(import.meta.url));

const source = readFileSync(join(here, "list.route.ts"), "utf8");

/**
 * The mapping the route used to do, scanned rather than indexed.
 *
 * Kept as the thing the indexed version has to keep agreeing with: the same
 * names in the same order, the same counts, the same fallbacks.
 */
const scanned = ({
  adminRoleIds,
  names,
  roles,
  userCounts,
}: {
  adminRoleIds: ReadonlySet<null | number>;
  names: RoleNameWord[];
  roles: { id: number }[];
  userCounts: RoleUsersCount[];
}) =>
  roles.map(role => ({
    ...role,
    name: names
      .filter(word => word.itemId === role.id)
      .map(word => ({ name: word.value, languageCode: word.languageCode })),
    usersCount: userCounts.find(item => item.roleId === role.id)?.total ?? 0,
    grantsAdmin: adminRoleIds.has(role.id),
  }));

const ROLES = [
  { color: null, id: 3 },
  { color: "#123456", id: 1 },
  { color: null, id: 9 },
  { color: null, id: 4 },
];

const NAMES: RoleNameWord[] = [
  { itemId: 1, languageCode: "en", value: "Members" },
  { itemId: 3, languageCode: "en", value: "Administrators" },
  { itemId: 1, languageCode: "pl", value: "Uzytkownicy" },
  { itemId: 3, languageCode: "pl", value: "Administratorzy" },
  { itemId: 9, languageCode: "en", value: "Guests" },
];

const COUNTS: RoleUsersCount[] = [
  { roleId: 9, total: 0 },
  { roleId: 1, total: 412 },
  { roleId: 3, total: 2 },
];

const ADMIN_ROLE_IDS = new Set<null | number>([3, null]);

const page = (
  overrides: Partial<Parameters<typeof scanned>[0]> = {},
): Parameters<typeof scanned>[0] => ({
  adminRoleIds: ADMIN_ROLE_IDS,
  names: NAMES,
  roles: ROLES,
  userCounts: COUNTS,
  ...overrides,
});

describe("the role list's derived fields", () => {
  it("answer exactly what the scan answered", () => {
    expect(withRolesAdminListFields(page())).toEqual(scanned(page()));
  });

  it("serialize to exactly the same JSON, keys and order included", () => {
    expect(JSON.stringify(withRolesAdminListFields(page()))).toBe(
      JSON.stringify(scanned(page())),
    );
  });

  it("keep the page's own role order", () => {
    expect(withRolesAdminListFields(page()).map(role => role.id)).toEqual([
      3, 1, 9, 4,
    ]);
  });

  it("keep every column the page query selected", () => {
    expect(withRolesAdminListFields(page())[1]).toMatchObject({
      color: "#123456",
      id: 1,
    });
  });

  it("keep each role's translations in the order they arrived", () => {
    expect(withRolesAdminListFields(page())[0].name).toEqual([
      { languageCode: "en", name: "Administrators" },
      { languageCode: "pl", name: "Administratorzy" },
    ]);
  });

  it("give an untranslated role an empty list rather than nothing", () => {
    expect(withRolesAdminListFields(page())[3].name).toEqual([]);
  });

  it("give a role nobody holds a count of zero", () => {
    expect(withRolesAdminListFields(page())[3].usersCount).toBe(0);
  });

  it("keep a reported zero a zero rather than falling back over it", () => {
    expect(withRolesAdminListFields(page())[2].usersCount).toBe(0);
  });

  it("mark only the roles with an admin-permissions row", () => {
    expect(
      withRolesAdminListFields(page()).map(role => role.grantsAdmin),
    ).toEqual([true, false, false, false]);
  });

  it.each([
    ["an empty page", { roles: [] }],
    ["nothing loaded at all", { names: [], userCounts: [] }],
    ["no admin role", { adminRoleIds: new Set<null | number>() }],
    ["one role translated many times", { roles: [{ id: 1 }, { id: 1 }] }],
  ])("agrees with the scan on %s", (_name, overrides) => {
    expect(withRolesAdminListFields(page(overrides))).toEqual(
      scanned(page(overrides)),
    );
  });
});

describe("the route itself", () => {
  it("maps through the indexed helper rather than scanning per role", () => {
    expect(source).toContain("withRolesAdminListFields({");
    expect(source).not.toContain("names.filter(");
    expect(source).not.toContain("userCounts.find(");
  });
});
