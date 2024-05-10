"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Languages__Edit,
  type Admin__Core_Languages__EditMutation,
  type Admin__Core_Languages__EditMutationVariables
} from "@/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";

export const editMutationApi = async (
  variables: Admin__Core_Languages__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__EditMutation,
      Admin__Core_Languages__EditMutationVariables
    >({
      query: Admin__Core_Languages__Edit,
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
