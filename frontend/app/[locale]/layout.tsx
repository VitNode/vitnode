import { ReactNode } from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Metadata } from "next";

import { CONFIG } from "@/config";
import { Providers } from "./providers";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Middleware,
  Core_MiddlewareQuery,
  Core_MiddlewareQueryVariables
} from "@/graphql/hooks";
import { cn } from "@/functions/classnames";
import { CatchLayout } from "./catch";
import { getConfigFile } from "@/config/helpers";
import "@/app/[locale]/(admin)/admin/global.css";
import "./global.css";

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

export function generateMetadata({ params: { locale } }: Props): Metadata {
  return {
    manifest: `${CONFIG.backend_public_url}/assets/${locale}/manifest.webmanifest`
  };
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
      <html
        lang={locale}
        className={cn(inter.variable, "vitnode")}
        data-theme-id={data.core_settings__show.theme_id ?? 1}
      >
        <body>
          <NextTopLoader
            color="hsl(var(--primary))"
            showSpinner={false}
            height={4}
          />
          <Providers data={data} config={config}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </Providers>
        </body>
      </html>
    );
  } catch (error) {
    return <CatchLayout defaultPlugins={defaultPlugins} locale={locale} />;
  }
}
