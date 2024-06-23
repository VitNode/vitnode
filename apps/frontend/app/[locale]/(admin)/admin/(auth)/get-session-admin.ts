import { cookies } from "next/headers";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Sessions__Authorization,
  Admin__Sessions__AuthorizationQuery,
  Admin__Sessions__AuthorizationQueryVariables,
} from "@/graphql/hooks";

export const getSessionAdminData = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get("vitnode-login-token-admin")) {
    return;
  }

  const { data } = await fetcher<
    Admin__Sessions__AuthorizationQuery,
    Admin__Sessions__AuthorizationQueryVariables
  >({
    query: Admin__Sessions__Authorization,
    cache: "force-cache",
  });

  return data;
};
