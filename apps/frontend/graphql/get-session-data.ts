import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const getSessionData = async () => {
  const { data } = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    cache: "force-cache",
  });

  return {
    data,
    default_plugin: data.core_sessions__authorization.plugin_default,
  };
};
