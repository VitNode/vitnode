import { IntlConfig } from 'next-intl';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './graphql/queries/core_middleware__show.generated';

export const i18nConfig = async ({
  pathsToMessagesFromPlugins,
  requestLocale,
}: {
  pathsToMessagesFromPlugins: ({
    plugin,
    locale,
  }: {
    locale: string;
    plugin: string;
  }) => Promise<{ default: unknown }>;
  requestLocale: Promise<string | undefined>;
}): Promise<IntlConfig> => {
  let locale = await requestLocale;
  let defaultLocale = 'en';

  let plugins: string[] = [];
  try {
    const {
      core_middleware__show: { plugins: pluginsFromServer, languages },
    } = await fetcher<
      Core_Middleware__ShowQuery,
      Core_Middleware__ShowQueryVariables
    >({
      query: Core_Middleware__Show,
    });

    const defaultLanguage = languages.find(lang => lang.default);
    defaultLocale = defaultLanguage?.code ?? 'en';
    if (!languages.find(lang => lang.code === locale)) {
      locale = defaultLanguage?.code;
    }

    plugins = pluginsFromServer;
  } catch (_) {
    plugins = ['core', 'admin'];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messagesFormApps: any[] = await Promise.all(
    plugins.map(async plugin => {
      try {
        const message = await pathsToMessagesFromPlugins({
          plugin,
          locale: locale ?? defaultLocale,
        });

        return message.default;
      } catch (_) {
        return {};
      }
    }),
  );

  return {
    locale: locale ?? defaultLocale,
    messages: {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {},
      ),
    },
    timeZone: 'UTC',
  };
};
