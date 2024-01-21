import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import configs from '@/config/config.json';
import { fetcher } from './graphql/fetcher';
import {
  Core_Plugins__Show,
  type Core_Plugins__ShowQuery,
  type Core_Plugins__ShowQueryVariables
} from './graphql/hooks';

export default getRequestConfig(async ({ locale }) => {
  const { data } = await fetcher<Core_Plugins__ShowQuery, Core_Plugins__ShowQueryVariables>({
    query: Core_Plugins__Show
  });

  const plugins = ['admin', 'core', ...data.core_plugins__show.edges.map(({ code }) => code)];

  const messagesFormApps = await Promise.all(
    plugins.map(async plugin => {
      return {
        ...(await import(`@/langs/${locale}/${plugin}.json`)).default
      };
    })
  );

  return {
    messages: {
      ...messagesFormApps.reduce((acc, messages) => ({ ...acc, ...messages }), {})
    },
    timeZone: 'UTC'
  };
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: configs.languages.locales.map(locale => locale.key)
});
