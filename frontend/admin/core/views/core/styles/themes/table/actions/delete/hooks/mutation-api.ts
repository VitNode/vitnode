"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Themes__Delete,
  type Admin__Core_Themes__DeleteMutation,
  type Admin__Core_Themes__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Themes__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__DeleteMutation,
      Admin__Core_Themes__DeleteMutationVariables
    >({
      query: Admin__Core_Themes__Delete,
      variables
    });

    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
