import type { Context } from "hono";

import { and, eq, inArray } from "drizzle-orm";

import { assertStaffPermission } from "@/api/lib/check-staff-permission";
import { SessionAdminModel } from "@/api/models/session-admin";
import { CONFIG_PLUGIN } from "@/config";
import { core_admin_permissions } from "@/database/admins";
import { core_moderators_permissions } from "@/database/moderators";
import { core_roles } from "@/database/roles";

const assertCanEditAdmin = async (c: Context): Promise<void> => {
  await assertStaffPermission(c, {
    type: "admin",
    plugin: CONFIG_PLUGIN.pluginId,
    module: "users",
    permission: "can_edit_admin",
  });
};

export const assertCanEditAdminTarget = async (
  c: Context,
  userId: number,
): Promise<void> => {
  const isTargetAdmin = await new SessionAdminModel(c).checkIfUserIsAdmin(
    userId,
  );
  if (!isTargetAdmin) return;

  await assertCanEditAdmin(c);
};

const rolesGrantStaffAccess = async (
  c: Context,
  roleIds: number[],
): Promise<boolean> => {
  if (roleIds.length === 0) return false;

  const db = c.get("db");

  const [rootRoles, adminRoles, moderatorRoles] = await Promise.all([
    db
      .select({ id: core_roles.id })
      .from(core_roles)
      .where(and(inArray(core_roles.id, roleIds), eq(core_roles.root, true)))
      .limit(1),
    db
      .select({ id: core_admin_permissions.id })
      .from(core_admin_permissions)
      .where(inArray(core_admin_permissions.roleId, roleIds))
      .limit(1),
    db
      .select({ id: core_moderators_permissions.id })
      .from(core_moderators_permissions)
      .where(inArray(core_moderators_permissions.roleId, roleIds))
      .limit(1),
  ]);

  return (
    rootRoles.length > 0 || adminRoles.length > 0 || moderatorRoles.length > 0
  );
};

export const assertCanAssignRoles = async (
  c: Context,
  roleIds: number[],
): Promise<void> => {
  const unique = [...new Set(roleIds)];
  if (!(await rolesGrantStaffAccess(c, unique))) return;

  await assertCanEditAdmin(c);
};

export const assertCanAssignPrimaryRole = async (
  c: Context,
  roleId: number,
): Promise<void> => {
  await assertCanAssignRoles(c, [roleId]);
};
