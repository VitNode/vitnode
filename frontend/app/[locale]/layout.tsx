/* eslint-disable @next/next/no-sync-scripts */
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Montserrat } from 'next/font/google';

import { Providers } from './Providers';

const montserrat = Montserrat({
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
    messages = (await import(`@/langs/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={montserrat.className}>
      <body>
        <script src="/vitnode_theme.js" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
