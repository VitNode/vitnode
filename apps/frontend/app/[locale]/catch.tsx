import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { Inter } from "next/font/google";

import { getConfigFile } from "@/config/get-config-file";
import { Providers } from "./providers";
import { InternalErrorView } from "@/admin/core/global/internal-error/internal-error-view";
import { cn } from "@/functions/classnames";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

interface Props {
  defaultPlugins: { code: string }[];
  locale: string;
}

export const CatchLayout = async ({ defaultPlugins, locale }: Props) => {
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
    ...messagesFormApps.reduce((acc, messages) => ({ ...acc, ...messages }), {})
  };
  const config = await getConfigFile();

  return (
    <html lang={locale} className={cn(inter.variable, "vitnode")}>
      <body className="theme_1">
        <Providers config={config}>
          <NextIntlClientProvider messages={messages}>
            <InternalErrorView showPoweredBy />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
};
