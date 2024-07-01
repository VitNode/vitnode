import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './graphql/graphql';

const handleI18nRouting = async () => {
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

    return createIntlMiddleware({
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ['en'],
      defaultLocale: defaultLanguage,
    });
  } catch (err) {
    return createIntlMiddleware({
      locales: ['en'],
      defaultLocale: 'en',
    });
  }
};

export const createMiddleware = async (request: NextRequest) => {
  const i18n = await handleI18nRouting();
  const response = i18n(request);

  // if (request.nextUrl.pathname) {
  //   console.log(request.nextUrl.pathname);
  // }

  return response;
};
