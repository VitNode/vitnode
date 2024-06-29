import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createMiddleware } from 'vitnode-frontend/middleware';

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware(await createMiddleware());
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|robots.txt|sitemap.xml|sitemap).*)',
};
