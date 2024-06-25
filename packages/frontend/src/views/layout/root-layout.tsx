import * as React from "react";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { MiddlewareData, Providers } from "./providers";
import { InternalErrorView } from "../global/internal-error/internal-error-view";

import { getConfigFile } from "../../helpers/config";

interface Props {
  children: React.ReactNode;
  getMiddlewareData: () => Promise<MiddlewareData>;
  params: { locale: string };
  className?: string;
}

export const RootLayout = async ({
  children,
  params: { locale },
  className,
  getMiddlewareData,
}: Props) => {
  const [messages, config] = await Promise.all([
    getMessages(),
    getConfigFile(),
  ]);

  try {
    const middlewareData = await getMiddlewareData();

    return (
      <html lang={locale} className={className}>
        <body>
          <NextTopLoader
            color="hsl(var(--primary))"
            showSpinner={false}
            height={4}
          />
          <Providers middlewareData={middlewareData} config={config}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </Providers>
        </body>
      </html>
    );
  } catch (e) {
    return (
      <html lang={locale} className={className}>
        <body>
          <Providers config={config}>
            <NextIntlClientProvider messages={messages}>
              <InternalErrorView />
            </NextIntlClientProvider>
          </Providers>
        </body>
      </html>
    );
  }
};
