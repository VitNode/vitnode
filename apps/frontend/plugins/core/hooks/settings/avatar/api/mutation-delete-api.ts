"use server";

import { revalidatePath } from "next/cache";

import {
  Core_Members__Avatar__Delete,
  Core_Members__Avatar__DeleteMutation,
  Core_Members__Avatar__DeleteMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationDeleteApi = async () => {
  try {
    const { data } = await fetcher<
      Core_Members__Avatar__DeleteMutation,
      Core_Members__Avatar__DeleteMutationVariables
    >({
      query: Core_Members__Avatar__Delete,
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
