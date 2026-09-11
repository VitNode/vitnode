import type { AnyRequestMiddleware } from "@tanstack/react-start";

import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

import type { LocaleConfig, VitNodeI18nConfig } from "@/lib/i18n/types";

import { localeRoutingFromConfig } from "@/lib/i18n/locale-routing";

import { createLocaleRequestMiddleware } from "./locale-middleware";

export interface VitNodeStartConfig<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  i18n: Pick<
    VitNodeI18nConfig<AppLocales>,
    "defaultLocale" | "localePrefix" | "locales"
  >;
}

export interface VitNodeStartOptions<
  AppLocales extends LocaleConfig[] = LocaleConfig[],
> {
  config: VitNodeStartConfig<AppLocales>;

  requestMiddleware?: readonly AnyRequestMiddleware[];
}

export const createVitNodeStart = <AppLocales extends LocaleConfig[]>({
  config,
  requestMiddleware = [],
}: VitNodeStartOptions<AppLocales>) => {
  const localeRouting = localeRoutingFromConfig(config.i18n);

  return createStart(() => ({
    requestMiddleware: [
      createCsrfMiddleware({ filter: ctx => ctx.handlerType === "serverFn" }),
      createLocaleRequestMiddleware(localeRouting),
      ...requestMiddleware,
    ],
  }));
};
