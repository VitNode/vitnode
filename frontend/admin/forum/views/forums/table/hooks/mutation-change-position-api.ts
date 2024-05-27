"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Change_PositionMutation,
  Admin__Forum_Forums__Change_PositionMutationVariables,
  Admin__Forum_Forums__Change_Position
} from "@/graphql/hooks";

export const mutationChangePositionApi = async (
  variables: Admin__Forum_Forums__Change_PositionMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__Change_PositionMutation,
      Admin__Forum_Forums__Change_PositionMutationVariables
    >({
      query: Admin__Forum_Forums__Change_Position,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
