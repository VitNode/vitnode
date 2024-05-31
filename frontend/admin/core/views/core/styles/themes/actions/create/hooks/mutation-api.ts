"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  Admin__Core_Themes__Create,
  Admin__Core_Themes__CreateMutation,
  Admin__Core_Themes__CreateMutationVariables
} from "@/utils/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";
import { fetcher } from "@/utils/graphql/fetcher";

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
