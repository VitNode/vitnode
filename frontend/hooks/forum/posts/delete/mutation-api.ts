"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Posts__Delete,
  Forum_Posts__DeleteMutation,
  Forum_Posts__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Forum_Posts__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Posts__DeleteMutation,
      Forum_Posts__DeleteMutationVariables
    >({
      query: Forum_Posts__Delete,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
