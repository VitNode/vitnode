import * as React from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";
import { Metadata } from "next";

import { CONFIG } from "@/config";
import { Providers } from "./providers";
import {
  Core_Middleware,
  Core_MiddlewareQuery,
  Core_MiddlewareQueryVariables
} from "@/utils/graphql/hooks";
import { cn } from "@/functions/classnames";
import { CatchLayout } from "./catch";
import { getConfigFile } from "@/config/helpers";
import { fetcher } from "@/utils/graphql/fetcher";
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

interface Props {
  children: React.ReactNode;
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

    const messagesFormApps = await Promise.all(
      (data
        ? [...data.core_plugins__show, ...defaultPlugins]
        : defaultPlugins
      ).map(async plugin => {
        try {
          return {
            ...(await import(`@/plugins/${plugin.code}/langs/${locale}.json`))
              .default
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
        className={cn(GeistSans.className, "vitnode")}
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
