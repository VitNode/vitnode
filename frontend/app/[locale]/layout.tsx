import configs from '~/config.json';

import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';

import { ThemeProvider } from './theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages: AbstractIntlMessages;
  try {
    const messagesFormApps = await Promise.all(
      configs.applications.map(async app => {
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
    <html lang={locale} className={inter.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
