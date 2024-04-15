import { fetcher } from "@/graphql/fetcher";
import {
  Core_Sessions__Authorization,
  type Core_Sessions__AuthorizationQuery,
  type Core_Sessions__AuthorizationQueryVariables
} from "@/graphql/hooks";

export const getSessionData = async () => {
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
    theme_id: data.core_settings__show.theme_id ?? 1,
    default_plugin: data.core_sessions__authorization.plugin_default
  };
};
