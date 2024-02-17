"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Nav__Delete,
  type Admin__Core_Nav__DeleteMutation,
  type Admin__Core_Nav__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Nav__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__DeleteMutation,
      Admin__Core_Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Nav__Delete,
      variables
    });

    revalidateTag("Core_Sessions__Authorization");
    revalidatePath("/admin/core/styles/nav", "page");
    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
