import { z } from "zod";

import type { VitNodeEditorConfig } from "@/components/editor-provider";
import type {
  JsonValue,
  VitNodePublicConfig,
  VitNodeThemeConfig,
} from "@/config/types";

import { buildRoute } from "@/api/lib/route";
import { CONFIG_PLUGIN } from "@/config";

export const publicConfigSchema: z.ZodType<VitNodePublicConfig> = z.object({
  debug: z.boolean(),
  editor: z.custom<VitNodeEditorConfig>().optional(),
  i18n: z.object({
    defaultLocale: z.string(),
    localePrefix: z.enum(["always", "as-needed", "never"]),
    locales: z.array(
      z.object({
        code: z.string(),
        enabled: z.boolean().optional(),
        name: z.string(),
      }),
    ),
    timeZone: z.string(),
  }),
  metadata: z.object({
    shortTitle: z.string().optional(),
    title: z.string(),
  }),
  plugins: z.array(
    z.object({
      pluginId: z.string(),
      publicOptions: z.custom<JsonValue>().optional(),
    }),
  ),
  theme: z.custom<VitNodeThemeConfig>().optional(),
});

export const routeMiddlewareSchema = z.object({
  ai: z.object({
    models: z.array(
      z.object({
        id: z.string(),
        model: z.string(),
        name: z.string(),
      }),
    ),
  }),
  sso: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      icon: z.string().optional(),
    }),
  ),
  isEmail: z.boolean(),
  captcha: z
    .object({
      siteKey: z.string(),
      type: z.enum(["cloudflare_turnstile", "recaptcha_v3"]),
    })
    .optional(),
  public: publicConfigSchema.optional(),
});

export const routeMiddleware = buildRoute({
  pluginId: CONFIG_PLUGIN.pluginId,
  route: {
    path: "/",
    method: "get",
    description: "Middleware route with user authentication",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: routeMiddlewareSchema,
          },
        },
        description: "Middleware route",
      },
    },
  },
  handler: c => {
    const sso = c.get("core").authorization.ssoAdapters;

    return c.json(
      {
        ai: { models: c.get("ai").models() },
        isEmail: !!c.get("core").email?.adapter,
        sso: sso.map(s => ({ id: s.id, name: s.name, icon: s.icon })),
        captcha: c.get("core").captcha
          ? {
              siteKey: c.get("core").captcha?.siteKey ?? "",
              type: c.get("core").captcha?.type ?? "cloudflare_turnstile",
            }
          : undefined,
        public: c.get("core").public,
      },
      200,
    );
  },
});
