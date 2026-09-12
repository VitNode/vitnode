import type { drizzle } from "drizzle-orm/postgres-js";
import type { IRateLimiterOptions } from "rate-limiter-flexible";

import type { CacheConfig } from "../api/lib/cache";
import type { CronAdapter } from "../api/lib/cron";
import type { BuildPluginApiReturn } from "../api/lib/plugin";
import type { AIConfig } from "../api/models/ai";
import type { EmailApiPlugin } from "../api/models/email";
import type { EventsApiPlugin } from "../api/models/events";
import type { SearchProviderApiPlugin } from "../api/models/search";
import type { SSOApiPlugin } from "../api/models/sso";
import type { StorageApiPlugin } from "../api/models/storage";
import type { VitNodeEditorConfig } from "../components/editor-provider";
import type { ThemeProviderProps } from "../components/theme-provider";
import type { DefaultTemplateEmailProps } from "../emails/default-template";
import type { LocalePrefixMode } from "../lib/i18n/locale-routing";
import type {
  AppMessagesMap,
  LocaleConfig,
  LocaleMessagesMap,
  VitNodeApiI18nConfig,
  VitNodeI18nConfig,
} from "../lib/i18n/types";
import type { VitNodeMetadata } from "../lib/metadata";

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue =
  JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type JsonObject = Record<string, JsonValue>;

export type VitNodeThemeConfig = Omit<
  ThemeProviderProps,
  "attribute" | "children" | "disableTransitionOnChange" | "enableSystem"
>;

export type VitNodePluginCapability =
  "adminContent" | "adminNav" | "api" | "routes";

export type VitNodePluginEntries = Partial<
  Record<VitNodePluginCapability, string>
>;

export interface VitNodePluginCapabilityRef {
  /** Whether the plugin named this module itself, and so must have it. */
  readonly declared: boolean;
  readonly specifier: string;
}

export interface VitNodePluginDefinition<
  TOptions = unknown,
  TPublicOptions = unknown,
> {
  /** Overrides only; every other capability keeps its conventional subpath. */
  readonly entries: VitNodePluginEntries;
  readonly kind: "vitnode.plugin";
  readonly options: TOptions;
  readonly pluginId: string;
  readonly publicOptions?: TPublicOptions;
}

export type AnyVitNodePluginDefinition = VitNodePluginDefinition;

export type VitNodePluginInput = AnyVitNodePluginDefinition;

export type VitNodeRuntimeMode = "development" | "production" | "test";

export interface VitNodeRuntimeContext {
  readonly env: Readonly<Record<string, string | undefined>>;
  readonly mode: VitNodeRuntimeMode;
}

export interface VitNodeAppConfig<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  i18n: VitNodeI18nConfig<AppLocales>;
  metadata: VitNodeMetadata;
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
  content?: {
    revalidateOrigins?: string[];
  };
  cron?: CronAdapter;
  dbProvider: ReturnType<typeof drizzle>;
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
  maxBodySize?: number;
  metadata: VitNodeMetadata;
  plugins: BuildPluginApiReturn[];
  public?: VitNodePublicConfig;
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
}

export type VitNodeApiRuntimeConfig = Omit<
  VitNodeApiConfig,
  "i18n" | "metadata" | "plugins" | "public"
> & {
  i18n?: VitNodeApiI18nConfig;
  metadata?: VitNodeMetadata;
};

export type VitNodeApiRuntimeFactory = (
  context: VitNodeRuntimeContext,
) => Promise<VitNodeApiRuntimeConfig> | VitNodeApiRuntimeConfig;

export interface VitNodeApiRuntime {
  readonly kind: "vitnode.api-runtime";
  readonly load: VitNodeApiRuntimeFactory;
}

export interface VitNodeWebPublicOptions {
  debug?: boolean;
  editor?: VitNodeEditorConfig;
  theme?: VitNodeThemeConfig;
}

export interface VitNodeWebServerOptions {
  messages?: AppMessagesMap;
  packageMessages?: Record<string, LocaleMessagesMap | undefined>;
}

export type VitNodeWebServerFactory = (
  context: VitNodeRuntimeContext,
) => Promise<VitNodeWebServerOptions> | VitNodeWebServerOptions;

export interface VitNodeWebRuntimeInput {
  public?: VitNodeWebPublicOptions;
  server?: VitNodeWebServerFactory;
}

export interface VitNodeWebRuntime {
  readonly kind: "vitnode.web-runtime";
  readonly loadServer?: VitNodeWebServerFactory;
  readonly public: VitNodeWebPublicOptions;
}

export interface VitNodeConfigInput<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  api?: VitNodeApiRuntime;
  app: VitNodeAppConfig<AppLocales>;
  plugins?: readonly VitNodePluginInput[];
  web?: VitNodeWebRuntime;
}

export interface VitNodeConfig<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  readonly api?: VitNodeApiRuntime;
  readonly app: VitNodeAppConfig<AppLocales>;
  readonly kind: "vitnode.config";
  readonly plugins: readonly AnyVitNodePluginDefinition[];
  readonly web?: VitNodeWebRuntime;
}

export interface VitNodePublicI18nConfig {
  defaultLocale: string;
  localePrefix: LocalePrefixMode;
  locales: LocaleConfig[];
  timeZone: string;
}

export interface VitNodePublicPlugin {
  pluginId: string;
  publicOptions?: JsonValue;
}

export interface VitNodePublicConfig {
  debug: boolean;
  editor?: VitNodeEditorConfig;
  i18n: VitNodePublicI18nConfig;
  metadata: VitNodeMetadata;
  plugins: VitNodePublicPlugin[];
  theme?: VitNodeThemeConfig;
}

export interface VitNodeWebServerConfig {
  readonly i18n: VitNodeI18nConfig;
  readonly kind: "vitnode.web-server-config";
  readonly messages?: AppMessagesMap;
  readonly metadata: VitNodeMetadata;
  readonly packageMessages: Record<string, LocaleMessagesMap | undefined>;
  readonly plugins: readonly { pluginId: string }[];
}

export type VitNodeApiPluginEntry<TOptions = unknown> = (
  options: TOptions,
  context: VitNodeRuntimeContext,
) => BuildPluginApiReturn | Promise<BuildPluginApiReturn>;
