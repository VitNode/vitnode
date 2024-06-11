"use server";

import {
  Core_Middleware,
  Core_MiddlewareQuery,
  Core_MiddlewareQueryVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

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
