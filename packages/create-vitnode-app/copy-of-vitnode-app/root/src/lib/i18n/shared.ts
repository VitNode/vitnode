import type { VitNodeLocale } from "@/vitnode.public.gen";

import { localeRouting } from "@/lib/i18n/runtime";

export type Locale = VitNodeLocale;

export { defaultLocale, localeRouting } from "@/lib/i18n/runtime";

export const isLocale = (value: null | string | undefined): value is Locale =>
  localeRouting.isSupportedLocale(value);
