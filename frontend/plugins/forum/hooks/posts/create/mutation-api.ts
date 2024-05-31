"use server";

import {
  Forum_Posts__Create,
  Forum_Posts__CreateMutation,
  Forum_Posts__CreateMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationApi = async (
  variables: Forum_Posts__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Posts__CreateMutation,
      Forum_Posts__CreateMutationVariables
    >({
      query: Forum_Posts__Create,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
