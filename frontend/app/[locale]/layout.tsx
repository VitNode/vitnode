import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
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
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <NextIntlClientProvider timeZone="UTC" locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
