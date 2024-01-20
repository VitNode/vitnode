import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { Inter } from 'next/font/google';

import { ThemeProvider } from './theme-provider';
import { getConfig } from '@/functions/get-config';

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

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
