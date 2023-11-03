import configs from '~/config.json';

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: configs.languages.locales.filter(locale => locale.enabled).map(locale => locale.key),
  defaultLocale: configs.languages.default
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
