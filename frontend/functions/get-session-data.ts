import { fetcher } from "@/graphql/fetcher";
import {
  Core_Sessions__Authorization,
  type Core_Sessions__AuthorizationQuery,
  type Core_Sessions__AuthorizationQueryVariables
} from "@/graphql/hooks";

export const getSessionData = async (): Promise<{
  data: Core_Sessions__AuthorizationQuery;
  default_plugin: string;
  theme_id: number;
}> => {
  const { data } = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    cache: "force-cache",
    next: {
      tags: ["Core_Sessions__Authorization"]
    }
  });

  return {
    data,
    theme_id: data.core_sessions__authorization.theme_id ?? 1,
    default_plugin: data.core_sessions__authorization.plugin_default
  };
};
