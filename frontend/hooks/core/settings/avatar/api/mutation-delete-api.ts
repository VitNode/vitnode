"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Members__Avatar__Delete,
  type Core_Members__Avatar__DeleteMutation,
  type Core_Members__Avatar__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationDeleteApi = async (): Promise<{
  data?: Core_Members__Avatar__DeleteMutation;
  error?: unknown;
}> => {
  try {
    const { data } = await fetcher<
      Core_Members__Avatar__DeleteMutation,
      Core_Members__Avatar__DeleteMutationVariables
    >({
      query: Core_Members__Avatar__Delete
    });

    revalidateTag("Core_Sessions__Authorization");

    return { data };
  } catch (error) {
    return { error };
  }
};
