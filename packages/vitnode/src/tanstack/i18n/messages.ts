import "@tanstack/react-start/server-only";
import type { AbstractIntlMessages } from "use-intl";

import type { VitNodeConfig, VitNodeWebServerConfig } from "@/config/types";
import type {
  AppMessagesMap,
  LocaleMessagesMap,
  MessagesSource,
} from "@/lib/i18n/types";

import { CONFIG_PLUGIN } from "@/config";
import { isVitNodeConfig } from "@/config/define";
import { resolveWebServerConfig } from "@/config/server";
import { loadMessages } from "@/lib/i18n/load-messages";
import { pickMessages } from "@/lib/i18n/pick-messages";
import { buildAppMessagesSources } from "@/lib/i18n/sources";

import type { IntlMessages } from "./runtime";

const WEB_SCOPE = "web";

export interface BundledMessagesOptions {
  /** The app's own overrides, keyed by locale and then plugin id. */
  appMessages?: AppMessagesMap;

  packageMessages: Record<string, LocaleMessagesMap | undefined>;
  /** The plugins this app registered, in the order they merge. */
  plugins: { pluginId: string }[];
}

export const buildBundledMessagesSources = ({
  appMessages,
  packageMessages,
  plugins,
}: BundledMessagesOptions): MessagesSource[] =>
  [
    {
      id: CONFIG_PLUGIN.pluginId,
      messages: packageMessages[CONFIG_PLUGIN.pluginId],
    },
    ...plugins.map(({ pluginId }) => ({
      id: pluginId,
      messages: packageMessages[pluginId],
    })),
    ...buildAppMessagesSources(appMessages, WEB_SCOPE),
  ].map(source => ({ ...source, scope: WEB_SCOPE }));

export interface IntlMessagesLoaderOptions extends BundledMessagesOptions {
  defaultLocale: string;
}

/** The messages one page needs, in one language. */
export type IntlMessagesLoader = (args: {
  locale: string;
  namespaces: readonly string[];
}) => Promise<IntlMessages>;

const isWebServerConfig = (
  options: IntlMessagesLoaderOptions | VitNodeWebServerConfig,
): options is VitNodeWebServerConfig =>
  "kind" in options && options.kind === "vitnode.web-server-config";

const loaderOptionsFrom = (
  options: IntlMessagesLoaderOptions | VitNodeWebServerConfig,
): IntlMessagesLoaderOptions =>
  isWebServerConfig(options)
    ? {
        appMessages: options.messages,
        defaultLocale: options.i18n.defaultLocale,
        packageMessages: options.packageMessages,
        plugins: [...options.plugins],
      }
    : options;

export type IntlMessagesLoaderInput =
  IntlMessagesLoaderOptions | VitNodeConfig | VitNodeWebServerConfig;

interface PreparedSources {
  defaultLocale: string;
  sources: MessagesSource[];
}

const prepareSources = (
  options: IntlMessagesLoaderOptions,
): PreparedSources => {
  const { defaultLocale, ...sourceOptions } = options;

  return { defaultLocale, sources: buildBundledMessagesSources(sourceOptions) };
};

export function createIntlMessagesLoader(
  options: IntlMessagesLoaderInput,
): IntlMessagesLoader {
  let prepared: Promise<PreparedSources> | undefined = isVitNodeConfig(options)
    ? undefined
    : Promise.resolve(prepareSources(loaderOptionsFrom(options)));

  const prepare = async (): Promise<PreparedSources> => {
    if (prepared) return prepared;

    const pending = resolveWebServerConfig(options as VitNodeConfig).then(
      resolved => prepareSources(loaderOptionsFrom(resolved)),
    );

    prepared = pending.catch((error: unknown) => {
      prepared = undefined;

      throw error;
    });

    return prepared;
  };

  return async ({
    locale,
    namespaces,
  }: {
    locale: string;
    namespaces: readonly string[];
  }): Promise<IntlMessages> => {
    const { defaultLocale, sources } = await prepare();
    const merged = await loadMessages({ defaultLocale, locale, sources });

    // `pickMessages` walks an unknown tree and cannot know what it found; what
    // it returns is a message tree by construction, every leaf a string from a
    // JSON file. Asserted here, once, rather than by every caller.
    return {
      locale,
      messages: pickMessages(merged, namespaces) as AbstractIntlMessages,
    };
  };
}
