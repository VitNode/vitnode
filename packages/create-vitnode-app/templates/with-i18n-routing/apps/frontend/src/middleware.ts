import createMiddleware from 'vitnode-frontend/middleware';

export default createMiddleware({
  isLocalePathRoute: true,
});

export const config = {
  matcher: '/((?!_next/static|_next/image|robots.txt|sitemap.xml|sitemap).*)',
};
