import { type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';

import { ThemeProvider } from './theme-provider';
import { getConfig } from '@/functions/get-config';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Authorization,
  type Core_Sessions__AuthorizationQuery,
  type Core_Sessions__AuthorizationQueryVariables
} from '@/graphql/hooks';
import { InternalErrorView } from '@/admin/core/global/internal-error-view';
import './global.scss';

export const getSessionData = async () => {
  const { data } = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    headers: {
      Cookie: cookies().toString(),
      ['user-agent']: headers().get('user-agent') ?? 'node'
    }
  });

  return data;
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const config = await getConfig();
  let messages: AbstractIntlMessages;
  try {
    const messagesFormApps = await Promise.all(
      config.applications.map(async app => {
        return {
          ...(await import(`@/langs/${locale}/${app}.json`)).default
        };
      })
    );

    messages = {
      ...messagesFormApps.reduce((acc, messages) => ({ ...acc, ...messages }), {})
    };
  } catch (error) {
    notFound();
  }

  try {
    const data = await getSessionData();

    return (
      <html lang={locale} className={inter.variable}>
        <body className={`theme_${data.core_sessions__authorization.theme_id ?? 1}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  } catch (error) {
    return (
      <html lang={locale} className={inter.variable}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages}>
              <InternalErrorView />
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }
}
