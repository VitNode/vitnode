import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { ThemeProvider } from './theme-provider';
import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_Sessions,
  Authorization_Core_SessionsQuery,
  Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

interface Props {
  children: ReactNode;
  params: { locale: string };
}

const getSession = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get(CONFIG.access_token) && !cookieStore.get(CONFIG.refresh_token)) {
    return;
  }

  return await fetcher<Authorization_Core_SessionsQuery, Authorization_Core_SessionsQueryVariables>(
    {
      query: Authorization_Core_Sessions,
      headers: {
        Cookie: cookies().toString()
      }
    }
  );
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          initialDataSession={await getSession()}
          enableSystem
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
