"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Edit,
  type Admin__Core_Plugins__EditMutation,
  type Admin__Core_Plugins__EditMutationVariables
} from "@/graphql/hooks";

export const mutationEditApi = async (
  variables: Admin__Core_Plugins__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__EditMutation,
      Admin__Core_Plugins__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Edit,
      variables
    });

    revalidatePath("/admin/core/plugins", "page");
    revalidateTag("Core_Sessions__Authorization");

    return { data };
  } catch (error) {
    return { error };
  }
};
