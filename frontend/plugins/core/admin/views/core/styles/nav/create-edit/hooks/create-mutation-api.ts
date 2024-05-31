"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  Admin__Core_Nav__Create,
  Admin__Core_Nav__CreateMutation,
  Admin__Core_Nav__CreateMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { CoreApiTags } from "@/plugins/core/admin/api-tags";

export const createMutationApi = async (
  variables: Admin__Core_Nav__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__CreateMutation,
      Admin__Core_Nav__CreateMutationVariables
    >({
      query: Admin__Core_Nav__Create,
      variables
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);
    revalidatePath("/admin/core/styles/nav", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
