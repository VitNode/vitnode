import type { LocaleConfig } from "../lib/i18n/types";
import type {
  VitNodeApiRuntime,
  VitNodeApiRuntimeFactory,
  VitNodeConfig,
  VitNodeConfigInput,
  VitNodeWebRuntime,
  VitNodeWebRuntimeInput,
} from "./types";

import { VitNodeConfigError } from "./errors";
import { normalizePlugins } from "./plugin";

export const DEFAULT_TIME_ZONE = "UTC";

export const DEFAULT_LOCALE_PREFIX = "as-needed";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isJsdom = (): boolean =>
  typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent);

export const assertNotInBrowser = (): void => {
  if (typeof document === "undefined" || isJsdom()) return;

  throw new VitNodeConfigError(
    "browser-import",
    "vitnode.config.ts was evaluated in a browser. The root config is server- and build-only; browser code reads the generated `src/vitnode.public.gen.ts` instead.",
  );
};

export const defineApiRuntime = (
  load: VitNodeApiRuntimeFactory,
): VitNodeApiRuntime => {
  if (typeof load !== "function") {
    throw new VitNodeConfigError(
      "config-invalid",
      "defineApiRuntime expects a function: `defineApiRuntime(async ({ env }) => ({ dbProvider, ... }))`.",
    );
  }

  return Object.freeze({ kind: "vitnode.api-runtime", load });
};

export const defineWebRuntime = ({
  public: publicOptions = {},
  server,
}: VitNodeWebRuntimeInput = {}): VitNodeWebRuntime => {
  if (server !== undefined && typeof server !== "function") {
    throw new VitNodeConfigError(
      "config-invalid",
      "defineWebRuntime expects `server` to be a function: `server: async () => ({ messages, packageMessages })`.",
    );
  }

  return Object.freeze({
    kind: "vitnode.web-runtime",
    ...(server === undefined ? {} : { loadServer: server }),
    public: { ...publicOptions },
  });
};

export const isVitNodeApiRuntime = (
  value: unknown,
): value is VitNodeApiRuntime =>
  isRecord(value) &&
  value.kind === "vitnode.api-runtime" &&
  typeof value.load === "function";

export const isVitNodeWebRuntime = (
  value: unknown,
): value is VitNodeWebRuntime =>
  isRecord(value) &&
  value.kind === "vitnode.web-runtime" &&
  isRecord(value.public);

export const isVitNodeConfig = (value: unknown): value is VitNodeConfig =>
  isRecord(value) &&
  value.kind === "vitnode.config" &&
  isRecord(value.app) &&
  Array.isArray(value.plugins);

const assertI18n = (i18n: unknown): void => {
  if (
    !isRecord(i18n) ||
    !Array.isArray(i18n.locales) ||
    i18n.locales.length === 0
  ) {
    throw new VitNodeConfigError(
      "config-invalid",
      "`app.i18n.locales` must list at least one locale, for example `[{ code: 'en', name: 'English' }]`.",
    );
  }

  const codes = i18n.locales.map((locale: unknown) =>
    isRecord(locale) && typeof locale.code === "string"
      ? locale.code
      : undefined,
  );

  if (codes.includes(undefined)) {
    throw new VitNodeConfigError(
      "config-invalid",
      "Every entry of `app.i18n.locales` needs a string `code` and a `name`.",
    );
  }

  if (
    typeof i18n.defaultLocale !== "string" ||
    !codes.includes(i18n.defaultLocale)
  ) {
    throw new VitNodeConfigError(
      "config-invalid",
      `\`app.i18n.defaultLocale\` (${JSON.stringify(i18n.defaultLocale)}) has to be one of the configured locales: ${codes.map(code => JSON.stringify(code)).join(", ")}.`,
    );
  }
};

export const defineVitNodeConfig = <const AppLocales extends LocaleConfig[]>(
  input: VitNodeConfigInput<AppLocales>,
): VitNodeConfig<AppLocales> => {
  assertNotInBrowser();

  if (!isRecord(input) || !isRecord(input.app)) {
    throw new VitNodeConfigError(
      "config-invalid",
      "defineVitNodeConfig expects `{ app: { i18n, metadata }, plugins, api, web }`.",
    );
  }

  assertI18n(input.app.i18n);

  if (
    !isRecord(input.app.metadata) ||
    typeof input.app.metadata.title !== "string"
  ) {
    throw new VitNodeConfigError(
      "config-invalid",
      "`app.metadata.title` is required: it names the site in a browser tab and in an email subject.",
    );
  }

  if (input.api !== undefined && !isVitNodeApiRuntime(input.api)) {
    throw new VitNodeConfigError(
      "config-invalid",
      "`api` has to be built with `defineApiRuntime(async ({ env }) => ({ ... }))`.",
    );
  }

  if (input.web !== undefined && !isVitNodeWebRuntime(input.web)) {
    throw new VitNodeConfigError(
      "config-invalid",
      "`web` has to be built with `defineWebRuntime({ public, server })`.",
    );
  }

  const plugins = normalizePlugins(input.plugins ?? [], "vitnode.config.ts");

  return Object.freeze({
    ...(input.api === undefined ? {} : { api: input.api }),
    app: {
      i18n: {
        ...input.app.i18n,
        localePrefix: input.app.i18n.localePrefix ?? DEFAULT_LOCALE_PREFIX,
        timeZone: input.app.i18n.timeZone ?? DEFAULT_TIME_ZONE,
      },
      metadata: input.app.metadata,
    },
    kind: "vitnode.config",
    plugins,
    ...(input.web === undefined ? {} : { web: input.web }),
  });
};

export const hasApiRuntime = (config: VitNodeConfig): boolean =>
  config.api !== undefined;

export const hasWebRuntime = (config: VitNodeConfig): boolean =>
  config.web !== undefined;

export const pluginIdsOf = (config: VitNodeConfig): string[] =>
  config.plugins.map(plugin => plugin.pluginId);
