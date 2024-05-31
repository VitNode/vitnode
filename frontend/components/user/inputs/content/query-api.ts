"use server";

import {
  Core_Members__Show__Search,
  Core_Members__Show__SearchQuery,
  Core_Members__Show__SearchQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

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
