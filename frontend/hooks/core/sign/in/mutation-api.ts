"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables
} from "@/graphql/hooks";
import { redirect } from "@/utils/i18n";
import { CoreApiTags } from "@/admin/core/api-tags";

export const mutationApi = async (
  variables: Core_Sessions__Sign_InMutationVariables
) => {
  try {
    await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);
  } catch (error) {
    return { error };
  }

  revalidatePath(variables.admin ? "/admin" : "/", "layout");
  redirect(variables.admin ? "/admin/core/dashboard" : "/");
};
