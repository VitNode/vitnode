"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Nav__Change_PositionMutation,
  Admin__Core_Nav__Change_PositionMutationVariables,
  Admin__Core_Nav__Change_Position,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationChangePositionApi = async (
  variables: Admin__Core_Nav__Change_PositionMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__Change_PositionMutation,
      Admin__Core_Nav__Change_PositionMutationVariables
    >({
      query: Admin__Core_Nav__Change_Position,
      variables,
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
