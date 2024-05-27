"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Languages__Delete,
  Admin__Core_Languages__DeleteMutation,
  Admin__Core_Languages__DeleteMutationVariables
} from "@/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";

export const mutationApi = async (
  variables: Admin__Core_Languages__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__DeleteMutation,
      Admin__Core_Languages__DeleteMutationVariables
    >({
      query: Admin__Core_Languages__Delete,
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
