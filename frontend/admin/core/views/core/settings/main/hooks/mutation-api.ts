"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_General_Settings__Edit,
  type Admin__Core_General_Settings__EditMutation,
  type Admin__Core_General_Settings__EditMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_General_Settings__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_General_Settings__EditMutation,
      Admin__Core_General_Settings__EditMutationVariables
    >({
      query: Admin__Core_General_Settings__Edit,
      variables
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
