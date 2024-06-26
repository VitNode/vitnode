"use server";

import { revalidatePath } from "next/cache";
import { fetcher } from "vitnode-frontend/graphql/fetcher";

import {
  Core_Members__Avatar__Delete,
  Core_Members__Avatar__DeleteMutation,
  Core_Members__Avatar__DeleteMutationVariables,
} from "@/graphql/hooks";

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
