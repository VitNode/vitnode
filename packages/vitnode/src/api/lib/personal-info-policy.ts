import type { Context } from "hono";

import { z } from "@hono/zod-openapi";
import { inArray } from "drizzle-orm";

import type { EnvVitNode } from "@/api/middlewares/global.middleware";

import { core_roles } from "@/database/roles";

import { getUserRoleIds } from "./check-staff-permission";

export interface PersonalInfoPolicy {
  canEdit: boolean;
}

export const zodPersonalInfoPolicy = z.object({ canEdit: z.boolean() });

export interface RolePersonalInfoLimits {
  allowEditPersonalInfo: boolean;
}

export const effectivePersonalInfoPolicy = (
  roles: RolePersonalInfoLimits[],
): PersonalInfoPolicy => ({
  canEdit: roles.length > 0 && roles.every(role => role.allowEditPersonalInfo),
});

export const resolvePersonalInfoPolicy = async (
  c: Context<EnvVitNode>,
  user: { id: number; roleId: number },
): Promise<PersonalInfoPolicy> => {
  const roleIds = await getUserRoleIds(c, user);
  const roles = await c
    .get("db")
    .select({ allowEditPersonalInfo: core_roles.allowEditPersonalInfo })
    .from(core_roles)
    .where(inArray(core_roles.id, roleIds));

  return effectivePersonalInfoPolicy(roles);
};
