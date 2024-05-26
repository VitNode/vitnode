"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Main_Settings__Edit,
  Admin__Core_Main_Settings__EditMutation,
  Admin__Core_Main_Settings__EditMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Main_Settings__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Main_Settings__EditMutation,
      Admin__Core_Main_Settings__EditMutationVariables
    >({
      query: Admin__Core_Main_Settings__Edit,
      variables
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
