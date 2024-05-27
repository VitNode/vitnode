"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Edit,
  Admin__Forum_Forums__EditMutation,
  Admin__Forum_Forums__EditMutationVariables
} from "@/graphql/hooks";

export const mutationEditApi = async (
  variables: Admin__Forum_Forums__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__EditMutation,
      Admin__Forum_Forums__EditMutationVariables
    >({
      query: Admin__Forum_Forums__Edit,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
