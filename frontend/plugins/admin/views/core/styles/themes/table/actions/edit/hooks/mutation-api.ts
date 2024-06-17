"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Themes__Edit,
  Admin__Core_Themes__EditMutation,
  Admin__Core_Themes__EditMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

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

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
