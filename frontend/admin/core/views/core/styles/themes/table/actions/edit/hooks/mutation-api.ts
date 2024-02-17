"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Themes__Edit,
  type Admin__Core_Themes__EditMutation,
  type Admin__Core_Themes__EditMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Themes__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__EditMutation,
      Admin__Core_Themes__EditMutationVariables
    >({
      query: Admin__Core_Themes__Edit,
      variables
    });

    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
