"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Members__Show__Search,
  type Core_Members__Show__SearchQuery,
  type Core_Members__Show__SearchQueryVariables
} from "@/graphql/hooks";

export const queryApi = async (
  variables: Core_Members__Show__SearchQueryVariables
) => {
  const { data } = await fetcher<
    Core_Members__Show__SearchQuery,
    Core_Members__Show__SearchQueryVariables
  >({
    query: Core_Members__Show__Search,
    variables
  });

  return data;
};
