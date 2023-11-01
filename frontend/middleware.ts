import configs from '~/config.json';

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: configs.locales,
  defaultLocale: 'en'
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
