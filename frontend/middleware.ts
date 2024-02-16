import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { fetcher } from "./graphql/fetcher";
import {
  Core_Languages__Show,
  type Core_Languages__ShowQuery,
  type Core_Languages__ShowQueryVariables
} from "./graphql/hooks";

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get("x-default-locale") || "en";

  try {
    const { data, res } = await fetcher<
      Core_Languages__ShowQuery,
      Core_Languages__ShowQueryVariables
    >({
      query: Core_Languages__Show,
      headers: {
        Cookie: request.cookies.toString()
        // ["user-agent"]: headers().get("user-agent") ?? "node"
      }
    });

    const languages = data.core_languages__show.edges.filter(
      lang => lang.enabled
    );
    const defaultLanguage =
      data.core_languages__show.edges.find(lang => lang.default)?.code ?? "en";
    const handleI18nRouting = createIntlMiddleware({
      locales: languages.length > 0 ? languages.map(edge => edge.code) : ["en"],
      defaultLocale: defaultLanguage
    });

    const response = handleI18nRouting(request);

    response.headers.set("x-default-locale", defaultLocale);
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) response.headers.set("set-cookie", setCookie);

    return response;
  } catch (error) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ["en"],
      defaultLocale: "en"
    });

    const response = handleI18nRouting(request);

    response.headers.set("x-default-locale", defaultLocale);

    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next|icons).*)"]
};
