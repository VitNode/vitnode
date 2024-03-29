"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Middleware,
  type Core_MiddlewareQuery,
  type Core_MiddlewareQueryVariables
} from "@/graphql/hooks";

export const middlewareQueryApi = async () => {
  try {
    const { data } = await fetcher<
      Core_MiddlewareQuery,
      Core_MiddlewareQueryVariables
    >({
      query: Core_Middleware
    });

    return data;
  } catch (e) {
    return null;
  }
};
