import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './graphql/graphql';
import { getSessionAdminData } from './graphql/get-session-admin';

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

    const i18n = {
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ['en'],
      defaultLocale: defaultLanguage,
    };

    return {
      i18n,
      createIntlMiddleware: createIntlMiddleware(i18n),
    };
  } catch (err) {
    const i18n = {
      locales: ['en'],
      defaultLocale: 'en',
    };

    return {
      i18n,
      createIntlMiddleware: createIntlMiddleware(i18n),
    };
  }
};

const removeLocaleFromUrl = (urlPath: string, locales: string[]): string => {
  const parts = urlPath.split('/');
  if (parts[0] === '') {
    parts.shift();
  }

  if (locales.includes(parts[0])) {
    // Remove the locale
    parts.shift();
  }

  return `/${parts.join('/')}`;
};

export const createMiddleware = async (request: NextRequest) => {
  const { createIntlMiddleware, i18n } = await handleI18nRouting();
  const response = createIntlMiddleware(request);
  const pathname = removeLocaleFromUrl(request.nextUrl.pathname, i18n.locales);

  // Redirect to /admin if the user is not logged in to AdminCP
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin' &&
    pathname !== '/admin/theme-editor' &&
    pathname !== '/admin/install'
  ) {
    try {
      await getSessionAdminData();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return response;
};
