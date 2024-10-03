import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: ['en'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
  });
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  matcher: '/((?!_next|robots.txt|sitemap.xml|sitemap).*)',
};
