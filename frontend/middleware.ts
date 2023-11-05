import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { fetcher } from './graphql/fetcher';
import {
  Middleware_Core_Languages,
  Middleware_Core_LanguagesQuery,
  Middleware_Core_LanguagesQueryVariables
} from './graphql/hooks';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  const data = await fetcher<
    Middleware_Core_LanguagesQuery,
    Middleware_Core_LanguagesQueryVariables
  >({
    query: Middleware_Core_Languages
  });

  const handleI18nRouting = createIntlMiddleware({
    locales: data.show_core_languages.edges.filter(item => item.enabled).map(edge => edge.id),
    defaultLocale: data.show_core_languages.edges.find(edge => edge.default)?.id ?? 'en'
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
