import configs from '~/config.json';

import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  timeZone: 'UTC'
}));

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: configs.languages.locales.filter(locale => locale.enabled).map(locale => locale.key)
});
