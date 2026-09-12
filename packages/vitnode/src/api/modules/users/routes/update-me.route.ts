import { z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

import { resolvePersonalInfoPolicy } from "@/api/lib/personal-info-policy";
import { buildRoute } from "@/api/lib/route";
import { invalidateSessionCacheForUser } from "@/api/models/session-revoke";
import { CONFIG_PLUGIN } from "@/config";
import { core_users } from "@/database/users";
import {
  personalInformationChanges,
  USER_FIRST_NAME_MAX_LENGTH,
  USER_HEADLINE_MAX_LENGTH,
  USER_LAST_NAME_MAX_LENGTH,
} from "@/lib/user-personal-information";

const nullableText = (max: number) => z.string().max(max).nullable();

export const zodUpdateMeSchema = z
  .object({
    firstName: nullableText(USER_FIRST_NAME_MAX_LENGTH).openapi({
      example: "Emirhan",
    }),
    lastName: nullableText(USER_LAST_NAME_MAX_LENGTH).openapi({
      example: "Boruch",
    }),
    headline: nullableText(USER_HEADLINE_MAX_LENGTH).openapi({
      example: "Team Manager",
    }),
    showRealName: z.boolean().openapi({ example: true }),
  })
  .partial()
  .refine(body => Object.values(body).some(value => value !== undefined), {
    message: "At least one field is required",
  });

export const zodPersonalInformation = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  headline: z.string().nullable(),
  showRealName: z.boolean(),
});

export const updateMeRoute = buildRoute({
  pluginId: CONFIG_PLUGIN.pluginId,
  route: {
    method: "patch",
    description: "Update the signed-in user's own personal information.",
    path: "/me",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: zodUpdateMeSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: zodPersonalInformation,
          },
        },
        description: "Personal information as it now stands",
      },
      401: {
        description: "Not signed in",
      },
      403: {
        content: {
          "application/json": {
            schema: z.object({ error: z.string() }),
          },
        },
        description:
          "The user's roles do not allow editing personal information",
      },
    },
  },
  handler: async c => {
    const user = c.get("user");
    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const policy = await resolvePersonalInfoPolicy(c, user);
    if (!policy.canEdit) {
      return c.json(
        { error: "Your role does not allow editing personal information." },
        403,
      );
    }

    const values = personalInformationChanges(c.req.valid("json"));

    const [updated] = await c
      .get("db")
      .update(core_users)
      .set(values)
      .where(eq(core_users.id, user.id))
      .returning({
        firstName: core_users.firstName,
        lastName: core_users.lastName,
        headline: core_users.headline,
        showRealName: core_users.showRealName,
      });

    if (!updated) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    await invalidateSessionCacheForUser(c, user.id);
    await c.get("events").emit("user.updated", {
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return c.json(updated, 200);
  },
});
