import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';

import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './utils/graphql';

export default async function middleware(request: NextRequest) {
  try {
    const {
      data: {
        core_middleware__show: { languages: langs },
      },
    } = await fetcher<
      Core_Middleware__ShowQuery,
      Core_Middleware__ShowQueryVariables
    >({
      query: Core_Middleware__Show,
    });
    const languages = langs.filter(lang => lang.enabled);
    const defaultLanguage = langs.find(lang => lang.default)?.code ?? 'en';
    const handleI18nRouting = createIntlMiddleware({
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ['en'],
      defaultLocale: defaultLanguage,
    });
    const response = handleI18nRouting(request);

    return response;
  } catch (error) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ['en'],
      defaultLocale: 'en',
    });
    const response = handleI18nRouting(request);

    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next|icons|robots.txt|sitemap.xml|sitemap).*)'],
};
