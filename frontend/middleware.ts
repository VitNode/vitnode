import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'en'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    '/((?!_next|assets|icons|favicon.ico|vitnode_theme.js|manifest.json|sw.js|sw.js.map|worker.*\\.js|workbox.*\\.js|worker.*\\.js).*)'
  ]
};
