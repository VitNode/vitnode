"use server";

import { revalidatePath } from "next/cache";

import {
  Core_Members__Sign_Up,
  Core_Members__Sign_UpMutation,
  Core_Members__Sign_UpMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (
  variables: Core_Members__Sign_UpMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Core_Members__Sign_UpMutation,
      Core_Members__Sign_UpMutationVariables
    >({
      query: Core_Members__Sign_Up,
      variables,
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
