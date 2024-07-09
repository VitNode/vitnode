import { IntlConfig } from 'next-intl';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './graphql/graphql';

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
  }) => Promise<{ default: any }>;
}): Promise<Omit<IntlConfig, 'locale'>> => {
  let plugins: string[] = [];
  try {
    const {
      core_middleware__show: { plugins: pluginsFromServer },
    } = await fetcher<
      Core_Middleware__ShowQuery,
      Core_Middleware__ShowQueryVariables
    >({
      query: Core_Middleware__Show,
    });

    plugins = pluginsFromServer;
  } catch (e) {
    plugins = ['core', 'admin'];
  }

  const messagesFormApps: any[] = await Promise.all(
    plugins.map(async plugin => {
      try {
        const message = await pathsToMessagesFromPlugins({
          plugin,
          locale,
        });

        return message.default;
      } catch (e) {
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
