import type { drizzle } from "drizzle-orm/postgres-js";
import type { IRateLimiterOptions } from "rate-limiter-flexible";

import type { CacheConfig } from "./api/lib/cache";
import type { TrustProxyConfig } from "./api/lib/client-ip";
import type { CronAdapter } from "./api/lib/cron";
import type { BuildPluginApiReturn } from "./api/lib/plugin";
import type { AIConfig } from "./api/models/ai";
import type { EmailApiPlugin } from "./api/models/email";
import type { EventsApiPlugin } from "./api/models/events";
import type { SearchProviderApiPlugin } from "./api/models/search";
import type { SSOApiPlugin } from "./api/models/sso";
import type { StorageApiPlugin } from "./api/models/storage";
import type { VitNodeEditorConfig } from "./components/editor-provider";
import type { ThemeProviderProps } from "./components/theme-provider";
import type { DefaultTemplateEmailProps } from "./emails/default-template";
import type {
  AppMessagesMap,
  LocaleConfig,
  LocaleMessagesMap,
  VitNodeApiI18nConfig,
  VitNodeI18nConfig,
} from "./lib/i18n/types";
import type { VitNodeMetadata } from "./lib/metadata";
import type { BuildPluginReturn } from "./lib/plugin";

export type { LocaleConfig };

export interface VitNodeConfig<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  debug?: boolean;
  /** Editor settings shared by every `Editor` in the app. */
  editor?: VitNodeEditorConfig;
  i18n: VitNodeI18nConfig<AppLocales>;
  metadata: VitNodeMetadata;
  plugins: BuildPluginReturn[];
  theme?: Omit<
    ThemeProviderProps,
    "attribute" | "children" | "disableTransitionOnChange" | "enableSystem"
  >;
}

export interface VitNodeServerConfig<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  /** The shared config this app also serves to the browser. */
  config: VitNodeConfig<AppLocales>;

  messages?: AppMessagesMap;

  packageMessages?: Record<string, LocaleMessagesMap | undefined>;
}

export interface VitNodeApiConfig {
  ai?: AIConfig;
  authorization?: {
    adminCookieExpires?: number;
    adminCookieName?: string;

    cookieDomain?: string;
    cookieExpires?: number;
    cookieName?: string;
    cookieSecure?: boolean;
    deviceCookieExpires?: number;
    deviceCookieName?: string;
    ssoAdapters?: SSOApiPlugin[];
  };
  captcha?: {
    secretKey: string | undefined;
    siteKey: string | undefined;
    type: "cloudflare_turnstile" | "recaptcha_v3";
  };
  /** Content Engine settings that are deployment-shaped rather than per type. */
  content?: {
    revalidateOrigins?: string[];
  };
  cron?: CronAdapter;
  dbProvider: ReturnType<typeof drizzle>;
  /**
   * Publishes the OpenAPI document at `/swagger/doc` and Swagger UI at
   * `/swagger`.
   *
   * Defaults to on in development and **off** in production. The document names
   * every route, parameter and response shape the install has, the admin tree
   * included, and it is served without authentication - which is a map of the
   * attack surface handed to anyone who asks. Turn it on deliberately, and put
   * something in front of it if the install is public.
   */
  docs?: { enabled?: boolean };
  email?: {
    adapter?: EmailApiPlugin;
    logo?: DefaultTemplateEmailProps["templateProps"]["logo"];
    tailwindConfig?: DefaultTemplateEmailProps["templateProps"]["tailwindConfig"];
  };

  events?: {
    adapter?: EventsApiPlugin;
  };

  i18n?: VitNodeApiI18nConfig;
  /**
   * Largest request body the API will read, in bytes. Defaults to 25 MB.
   *
   * The outer wall, not the upload rule: a Content Engine file field has its own
   * `maxBytes` and is checked before a byte reaches storage. This exists because
   * without it nothing bounded a body at all, and `POST /sign_in` buffers its
   * JSON and then runs scrypt on it - memory and CPU whose size an
   * unauthenticated caller was choosing.
   */
  maxBodySize?: number;
  metadata: VitNodeMetadata;
  plugins: BuildPluginApiReturn[];
  rateLimiter?: Omit<IRateLimiterOptions, "keyPrefix">;

  redis?: CacheConfig;

  search?: {
    adapter?: SearchProviderApiPlugin;
  };

  storage?: {
    adapter?: StorageApiPlugin;

    image?: {
      quality?: number;
      webp?: boolean;
    };
  };
  /**
   * How many reverse proxies stand between the internet and this API.
   *
   * Left unset, no forwarded header is believed at all and the client address is
   * the socket's - the one thing a caller cannot choose for itself. That is the
   * right answer when the API is reached directly, and the only safe default:
   * `X-Forwarded-For` is a *request* header, so trusting it unconditionally lets
   * every caller pick their own rate-limit bucket and their own line in the
   * audit trail.
   *
   * Set it to the number of proxies actually in front of the app - `true` means
   * one, the ordinary nginx / Traefik / platform-edge deployment - and the
   * address that proxy observed is used instead. The count is what makes the
   * header trustworthy: it is read that many entries from the *right*, so
   * anything a client wrote itself stays to the left of the answer and is
   * stepped over rather than believed.
   *
   * Getting it too high is the failure worth avoiding: it reaches past the
   * entries real proxies appended and back into client-supplied text.
   */
  trustProxy?: TrustProxyConfig;
}

let registeredVitNodeConfig: undefined | VitNodeConfig;

export function buildConfig<const AppLocales extends LocaleConfig[]>(
  args: VitNodeConfig<AppLocales>,
): VitNodeConfig<AppLocales> {
  const config = {
    ...args,
    i18n: {
      ...args.i18n,
      localePrefix: args.i18n.localePrefix ?? "as-needed",
    },
  };

  // Register the app config so framework-owned modules - core's own route
  // screens and breadcrumbs among them - can read it without prop-drilling.
  registeredVitNodeConfig = config;

  return config;
}

export function buildServerConfig<const AppLocales extends LocaleConfig[]>(
  args: VitNodeServerConfig<AppLocales>,
): VitNodeServerConfig<AppLocales> {
  return args;
}

export const getVitNodeConfig = (): VitNodeConfig => {
  if (!registeredVitNodeConfig) {
    throw new Error(
      "VitNode config not initialized - ensure `buildConfig` runs in your vitnode.config.ts.",
    );
  }

  return registeredVitNodeConfig;
};

export function buildApiConfig(args: VitNodeApiConfig): VitNodeApiConfig {
  return args;
}
