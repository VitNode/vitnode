"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Files__Delete,
  Admin__Core_Files__DeleteMutation,
  Admin__Core_Files__DeleteMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Core_Files__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Files__DeleteMutation,
      Admin__Core_Files__DeleteMutationVariables
    >({
      query: Admin__Core_Files__Delete,
      variables,
    });

    revalidatePath("/admin/core/advanced/files", "page");
    revalidatePath("/settings/files", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
