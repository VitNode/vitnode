"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Delete,
  type Admin__Core_Plugins__DeleteMutation,
  type Admin__Core_Plugins__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Plugins__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__DeleteMutation,
      Admin__Core_Plugins__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Delete,
      variables
    });

    revalidatePath("/admin/core/plugins", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
