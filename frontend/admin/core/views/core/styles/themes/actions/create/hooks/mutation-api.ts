"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Themes__Create,
  type Admin__Core_Themes__CreateMutation,
  type Admin__Core_Themes__CreateMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Themes__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__CreateMutation,
      Admin__Core_Themes__CreateMutationVariables
    >({
      query: Admin__Core_Themes__Create,
      variables
    });

    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
