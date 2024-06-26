"use server";

import { revalidatePath } from "next/cache";
import { fetcher } from "vitnode-frontend/graphql/fetcher";

import {
  Admin__Core_Languages__Delete,
  Admin__Core_Languages__DeleteMutation,
  Admin__Core_Languages__DeleteMutationVariables,
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Languages__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__DeleteMutation,
      Admin__Core_Languages__DeleteMutationVariables
    >({
      query: Admin__Core_Languages__Delete,
      variables,
    });

    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
