"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Nav__Delete,
  Admin__Core_Nav__DeleteMutation,
  Admin__Core_Nav__DeleteMutationVariables
} from "@/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";

export const mutationApi = async (
  variables: Admin__Core_Nav__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__DeleteMutation,
      Admin__Core_Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Nav__Delete,
      variables
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);
    revalidatePath("/admin/core/styles/nav", "page");
    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
