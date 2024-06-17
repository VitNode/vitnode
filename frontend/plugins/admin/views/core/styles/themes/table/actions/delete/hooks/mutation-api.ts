"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Themes__Delete,
  Admin__Core_Themes__DeleteMutation,
  Admin__Core_Themes__DeleteMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

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

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
