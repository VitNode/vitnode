"use server";

import {
  Forum_Topics__Edit,
  Forum_Topics__EditMutation,
  Forum_Topics__EditMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationEditApi = async (
  variables: Forum_Topics__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Topics__EditMutation,
      Forum_Topics__EditMutationVariables
    >({
      query: Forum_Topics__Edit,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
