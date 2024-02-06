import { cookies, headers } from "next/headers";

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
    headers: {
      Cookie: cookies().toString(),
      ["user-agent"]: headers().get("user-agent") ?? "node"
    },
    cache: "force-cache",
    next: {
      tags: ["Core_Sessions__Authorization"]
    }
  });

  const theme_id = data.core_sessions__authorization.theme_id ?? 1;

  return { data, theme_id };
};
