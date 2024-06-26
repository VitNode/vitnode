"use server";

import { revalidatePath } from "next/cache";
import { fetcher } from "vitnode-frontend/helpers/fetcher";

import {
  Admin__Core_Nav__Delete,
  Admin__Core_Nav__DeleteMutation,
  Admin__Core_Nav__DeleteMutationVariables,
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Nav__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__DeleteMutation,
      Admin__Core_Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Nav__Delete,
      variables,
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
