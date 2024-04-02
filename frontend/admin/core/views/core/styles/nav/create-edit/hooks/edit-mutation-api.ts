"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Nav__Edit,
  type Admin__Core_Nav__EditMutation,
  type Admin__Core_Nav__EditMutationVariables
} from "@/graphql/hooks";

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

    revalidateTag("Core_Sessions__Authorization");
    revalidatePath("/admin/core/styles/nav", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
