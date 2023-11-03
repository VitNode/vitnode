import configs from '~/config.json';

import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export default getRequestConfig(async ({ locale }) => {
  const messagesFormApps = await Promise.all(
    configs.applications.map(async app => {
      return {
        ...(await import(`~/langs/${locale}/${app}.json`)).default
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
  locales: configs.languages.locales.filter(locale => locale.enabled).map(locale => locale.key)
});
