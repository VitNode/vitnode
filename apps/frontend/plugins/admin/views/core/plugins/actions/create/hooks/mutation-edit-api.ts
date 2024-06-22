"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Plugins__Edit,
  Admin__Core_Plugins__EditMutation,
  Admin__Core_Plugins__EditMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationEditApi = async (
  variables: Admin__Core_Plugins__EditMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__EditMutation,
      Admin__Core_Plugins__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Edit,
      variables,
    });

    revalidatePath("/admin/core/plugins/blog/dev/overview", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
