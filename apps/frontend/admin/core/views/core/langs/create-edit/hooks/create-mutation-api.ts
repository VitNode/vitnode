"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  type Admin__Core_Languages__CreateMutationVariables,
  Admin__Core_Languages__Create,
  type Admin__Core_Languages__CreateMutation
} from "@/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";

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
