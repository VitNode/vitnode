import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware,
  type Core_MiddlewareQuery,
  type Core_MiddlewareQueryVariables
} from './graphql/hooks';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  try {
    const { data, res } = await fetcher<Core_MiddlewareQuery, Core_MiddlewareQueryVariables>({
      query: Core_Middleware,
      headers: {
        Cookie: request.cookies.toString()
      }
    });

    const languages = data.core_middleware.languages;
    const handleI18nRouting = createIntlMiddleware({
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ['en'],
      defaultLocale: data.core_middleware.default_language
    });

    const response = handleI18nRouting(request);

    response.headers.set('x-default-locale', defaultLocale);
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) response.headers.set('set-cookie', setCookie);

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
  matcher: ['/((?!api|_next|icons).*)']
};
