"use server";

import { cookies, headers } from "next/headers";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Sessions__Authorization,
  type Core_Sessions__AuthorizationQuery,
  type Core_Sessions__AuthorizationQueryVariables
} from "@/graphql/hooks";
import { setCookieFromApi } from "../cookie-from-string-to-object";

export const queryApi = async () => {
  const { data, res } = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    headers: {
      Cookie: cookies().toString(),
      ["user-agent"]: headers().get("user-agent") ?? "node"
    },
    // cache: "force-cache",
    next: {
      tags: ["Core_Sessions__Authorization"]
    }
  });

  // Set cookie
  setCookieFromApi({ res });

  return data;
};
