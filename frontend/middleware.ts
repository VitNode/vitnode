import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { fetcher } from './graphql/fetcher';
import {
  Core_Languages__Middleware,
  type Core_Languages__MiddlewareQuery,
  type Core_Languages__MiddlewareQueryVariables
} from './graphql/hooks';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  try {
    const data = await fetcher<
      Core_Languages__MiddlewareQuery,
      Core_Languages__MiddlewareQueryVariables
    >({
      query: Core_Languages__Middleware
    });

    const enabledLanguages = data.core_languages__show.edges.filter(item => item.enabled);
    const handleI18nRouting = createIntlMiddleware({
      locales: enabledLanguages.length > 0 ? enabledLanguages.map(edge => edge.id) : ['en'],
      defaultLocale: enabledLanguages.find(edge => edge.default)?.id || 'en'
    });

    const response = handleI18nRouting(request);

    response.headers.set('x-default-locale', defaultLocale);

    return response;
  } catch (error) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ['en'],
      defaultLocale: 'en'
    });

    const response = handleI18nRouting(request);

    response.headers.set('x-default-locale', defaultLocale);

    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next).*)']
};
