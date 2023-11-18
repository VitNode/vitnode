// TODO: Remove this when i18n will be compatible with Next.js 13.0.3
/* eslint-disable @typescript-eslint/ban-ts-comment */
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

  try {
    const data = await fetcher<
      Middleware_Core_LanguagesQuery,
      Middleware_Core_LanguagesQueryVariables
    >({
      query: Middleware_Core_Languages
    });

    const enabledLanguages = data.show_core_languages.edges.filter(item => item.enabled);
    const handleI18nRouting = createIntlMiddleware({
      locales: enabledLanguages.length > 0 ? enabledLanguages.map(edge => edge.id) : ['en'],
      defaultLocale: enabledLanguages.find(edge => edge.default)?.id || 'en'
    });

    // @ts-expect-error
    const response = handleI18nRouting(request);

    response.headers.set('x-default-locale', defaultLocale);

    return response;
  } catch (error) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ['en'],
      defaultLocale: 'en'
    });

    // @ts-expect-error
    const response = handleI18nRouting(request);

    response.headers.set('x-default-locale', defaultLocale);

    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
