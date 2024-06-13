import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { fetcher } from "./graphql/fetcher";
import {
  Core_Middleware__Languages,
  Core_Middleware__LanguagesQuery,
  Core_Middleware__LanguagesQueryVariables
} from "./graphql/hooks";

export default async function middleware(request: NextRequest) {
  try {
    const {
      data: { core_middleware__languages: langs }
    } = await fetcher<
      Core_Middleware__LanguagesQuery,
      Core_Middleware__LanguagesQueryVariables
    >({
      query: Core_Middleware__Languages
    });
    const languages = langs.filter(lang => lang.enabled);
    const defaultLanguage = langs.find(lang => lang.default)?.code ?? "en";
    const handleI18nRouting = createIntlMiddleware({
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ["en"],
      defaultLocale: defaultLanguage
    });
    const response = handleI18nRouting(request);

    return response;
  } catch (error) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ["en"],
      defaultLocale: "en"
    });
    const response = handleI18nRouting(request);

    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next|icons|robots.txt|sitemap.xml|sitemap).*)"]
};
