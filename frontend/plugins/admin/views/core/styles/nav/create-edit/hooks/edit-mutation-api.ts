"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Nav__Edit,
  Admin__Core_Nav__EditMutation,
  Admin__Core_Nav__EditMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const editMutationApi = async (
  variables: Admin__Core_Nav__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__EditMutation,
      Admin__Core_Nav__EditMutationVariables
    >({
      query: Admin__Core_Nav__Edit,
      variables
    });

    revalidatePath("/admin/core/styles/nav", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
