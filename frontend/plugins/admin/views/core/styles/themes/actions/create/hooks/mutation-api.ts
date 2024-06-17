"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Themes__Create,
  Admin__Core_Themes__CreateMutation,
  Admin__Core_Themes__CreateMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

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

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
