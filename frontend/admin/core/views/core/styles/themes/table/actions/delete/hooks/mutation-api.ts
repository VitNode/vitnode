"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  Admin__Core_Themes__Delete,
  Admin__Core_Themes__DeleteMutation,
  Admin__Core_Themes__DeleteMutationVariables
} from "@/utils/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Core_Themes__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__DeleteMutation,
      Admin__Core_Themes__DeleteMutationVariables
    >({
      query: Admin__Core_Themes__Delete,
      variables
    });

    revalidatePath("/admin/core/styles/themes", "page");
    revalidateTag(CoreApiTags.Core_Sessions__Authorization);

    return { data };
  } catch (error) {
    return { error };
  }
};
