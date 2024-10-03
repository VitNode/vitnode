import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { fetcher } from './graphql/fetcher';
import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from './graphql/queries/core_middleware__show.generated';

const getI18n = async () => {
  try {
    const { core_middleware__show } = await fetcher<
      Core_Middleware__ShowQuery,
      Core_Middleware__ShowQueryVariables
    >({
      query: Core_Middleware__Show,
    });

    const { languages: langs } = core_middleware__show;

    const languages = langs.filter(lang => lang.enabled);
    const defaultLanguage = langs.find(lang => lang.default)?.code ?? 'en';

    const i18n = {
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ['en'],
      defaultLocale: defaultLanguage,
    };

    return {
      ...i18n,
      core_middleware__show,
    };
  } catch (_) {
    const i18n = {
      locales: ['en'],
      defaultLocale: 'en',
    };

    return { ...i18n, core_middleware__show: null };
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

export function createMiddleware() {
  return async function middleware(request: NextRequest) {
    const i18n = await getI18n();
    const handleI18nRouting = createIntlMiddleware({
      ...i18n,
      localePrefix: i18n.locales.length > 1 ? 'always' : 'as-needed',
    });
    const pathname = removeLocaleFromUrl(
      request.nextUrl.pathname,
      i18n.locales,
    );
    const cookieSession = {
      default: request.cookies.get('vitnode-login-token'),
      admin: request.cookies.get('vitnode-login-token-admin'),
    };

    if (i18n.core_middleware__show) {
      const { authorization } = i18n.core_middleware__show;
      // Redirect if force login is true
      if (
        authorization.force_login &&
        !cookieSession.default &&
        !pathname.startsWith('/admin') &&
        pathname !== '/login' &&
        pathname !== '/register'
      ) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    // Redirect to /admin if the user is not logged in to AdminCP
    if (
      pathname.startsWith('/admin') &&
      pathname !== '/admin' &&
      pathname !== '/admin/theme-editor' &&
      pathname !== '/admin/install' &&
      !cookieSession.admin
    ) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return handleI18nRouting(request);
  };
}
