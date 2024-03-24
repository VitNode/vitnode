import { type ReactNode } from "react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { Inter } from "next/font/google";

import { ThemeProvider } from "./theme-provider";
import { InternalErrorView } from "@/admin/core/global/internal-error/internal-error-view";
import "./global.scss";
import { getSessionData } from "@/functions/get-session-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  let messages: AbstractIntlMessages = {};

  try {
    const { data, plugins } = await getSessionData();

    const messagesFormApps = await Promise.all(
      plugins.map(async plugin => {
        return {
          ...(await import(`@/langs/${locale}/${plugin.code}.json`)).default
        };
      })
    );

    messages = {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {}
      )
    };

    return (
      <html lang={locale} className={inter.variable}>
        <body
          className={`theme_${data.core_sessions__authorization.theme_id ?? 1}`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
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
