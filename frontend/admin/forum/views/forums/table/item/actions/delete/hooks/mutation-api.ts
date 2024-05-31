"use server";

import {
  Admin__Forum_Forums__Delete,
  Admin__Forum_Forums__DeleteMutation,
  Admin__Forum_Forums__DeleteMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Forum_Forums__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__DeleteMutation,
      Admin__Forum_Forums__DeleteMutationVariables
    >({
      query: Admin__Forum_Forums__Delete,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
