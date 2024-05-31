"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  Admin__Core_Languages__CreateMutationVariables,
  Admin__Core_Languages__Create,
  Admin__Core_Languages__CreateMutation
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { CoreApiTags } from "@/plugins/admin/api-tags";

export const createMutationApi = async (
  variables: Admin__Core_Languages__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__CreateMutation,
      Admin__Core_Languages__CreateMutationVariables
    >({
      query: Admin__Core_Languages__Create,
      variables
    });

    revalidatePath("/", "layout");
    revalidateTag(CoreApiTags.Core_Sessions__Authorization);
    revalidatePath("/admin/core/langs", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
