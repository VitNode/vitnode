"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  Admin__Core_Nav__Edit,
  Admin__Core_Nav__EditMutation,
  Admin__Core_Nav__EditMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import { CoreApiTags } from "@/plugins/admin/api-tags";

export const editMutationApi = async (
  variables: Admin__Core_Nav__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__EditMutation,
      Admin__Core_Nav__EditMutationVariables
    >({
      query: Admin__Core_Nav__Edit,
      variables
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);
    revalidatePath("/admin/core/styles/nav", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
