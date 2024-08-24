import { notFound } from 'next/navigation';
import { IntlConfig } from 'next-intl';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './graphql/queries/core_middleware__show.generated';

export const i18nConfig = async ({
  pathsToMessagesFromPlugins,
  locale,
}: {
  locale: string;
  pathsToMessagesFromPlugins: ({
    plugin,
    locale,
  }: {
    locale: string;
    plugin: string;
  }) => Promise<{ default: unknown }>;
}): Promise<Omit<IntlConfig, 'locale'>> => {
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

    if (!languages.find(lang => lang.code === locale)) {
      notFound();
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
          locale,
        });

        return message.default;
      } catch (_) {
        return {};
      }
    }),
  );

  return {
    messages: {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {},
      ),
    },
    timeZone: 'UTC',
  };
};
