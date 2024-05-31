"use server";

import {
  Forum_Posts__Delete,
  Forum_Posts__DeleteMutation,
  Forum_Posts__DeleteMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

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
