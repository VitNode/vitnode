"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Themes__Create,
  type Admin__Core_Themes__CreateMutation,
  type Admin__Core_Themes__CreateMutationVariables
} from "@/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";

export const mutationApi = async (
  variables: Admin__Core_Themes__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__CreateMutation,
      Admin__Core_Themes__CreateMutationVariables
    >({
      query: Admin__Core_Themes__Create,
      variables
    });

    revalidatePath("/admin/core/styles/themes", "page");
    revalidateTag(CoreApiTags.Core_Sessions__Authorization);

    return { data };
  } catch (error) {
    return { error };
  }
};
