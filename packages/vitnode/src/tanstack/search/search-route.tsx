import type { QueryClient } from "@tanstack/react-query";

import { createTranslator } from "use-intl";

import type { SearchFeedParams } from "@/views/search/search-feed-query";

import { intlQueryOptions } from "../i18n/query";
import { feedQueryOptions } from "./feed";
import { searchRouteFeedParams } from "./route-search";

export const SEARCH_NAMESPACES = ["core.global", "core.search"] as const;

/** The narrowest slice of a route's context this loader reads. */
export interface SearchLoaderContext {
  locale: string;
  queryClient: QueryClient;
}

/** What {@link loadSearchRoute} returns, and therefore what `head` receives. */
export interface SearchRouteData {
  description: string;
  params: SearchFeedParams;
  title: string;
}

export const loadSearchRoute = async ({
  locale,
  queryClient,
  search,
}: SearchLoaderContext & { search?: string }): Promise<SearchRouteData> => {
  const params = searchRouteFeedParams({ search });

  const [intl] = await Promise.all([
    queryClient.query({
      ...intlQueryOptions({ locale, namespaces: SEARCH_NAMESPACES }),
      staleTime: "static",
    }),
    queryClient.infiniteQuery({
      ...feedQueryOptions({ locale, params }),
      staleTime: "static",
    }),
  ]);

  const t = createTranslator({
    locale,
    messages: intl.messages as {
      core: { search: { desc: string; title: string } };
    },
    namespace: "core.search",
  });

  return { description: t("desc"), params, title: t("title") };
};
