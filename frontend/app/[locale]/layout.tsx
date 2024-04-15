import { type ReactNode } from "react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import { InternalErrorView } from "@/admin/core/global/internal-error/internal-error-view";
import "./global.scss";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Middleware,
  type Core_MiddlewareQuery,
  type Core_MiddlewareQueryVariables
} from "@/graphql/hooks";
import { getConfigFile } from "@/config/get-config-file";

const getData = async () => {
  const { data } = await fetcher<
    Core_MiddlewareQuery,
    Core_MiddlewareQueryVariables
  >({
    query: Core_Middleware
  });

  return data;
};

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
  const defaultPlugins = [{ code: "core" }, { code: "admin" }];

  try {
    const [data, config] = await Promise.all([getData(), getConfigFile()]);
    // const { data } = await getSessionData();

    const messagesFormApps = await Promise.all(
      (data
        ? [...data.core_plugins__show, ...defaultPlugins]
        : defaultPlugins
      ).map(async plugin => {
        try {
          return {
            ...(await import(`@/langs/${locale}/${plugin.code}.json`)).default
          };
        } catch (e) {
          return {};
        }
      })
    );

    const messages: AbstractIntlMessages = {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {}
      )
    };

    return (
      <html lang={locale} className={inter.variable}>
        <body className={`theme_${data.core_settings__show.theme_id ?? 1}`}>
          <Providers data={data} config={config}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </Providers>
        </body>
      </html>
    );
  } catch (error) {
    const messagesFormApps = await Promise.all(
      defaultPlugins.map(async plugin => {
        try {
          return {
            ...(await import(`@/langs/${locale}/${plugin.code}.json`)).default
          };
        } catch (e) {
          return {};
        }
      })
    );

    const messages: AbstractIntlMessages = {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {}
      )
    };
    const config = await getConfigFile();

    return (
      <html lang={locale} className={inter.variable}>
        <body>
          <Providers config={config}>
            <NextIntlClientProvider messages={messages}>
              <InternalErrorView showPoweredBy />
            </NextIntlClientProvider>
          </Providers>
        </body>
      </html>
    );
  }
}
