"use server";

import { revalidateTag } from "next/cache";

import {
  Core_Members__Sign_Up,
  Core_Members__Sign_UpMutation,
  Core_Members__Sign_UpMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { CoreApiTags } from "@/plugins/core/admin/api-tags";

interface Args {
  variables: Core_Members__Sign_UpMutationVariables;
  installPage?: boolean;
}

export const mutationApi = async ({ installPage, variables }: Args) => {
  try {
    const { data } = await fetcher<
      Core_Members__Sign_UpMutation,
      Core_Members__Sign_UpMutationVariables
    >({
      query: Core_Members__Sign_Up,
      variables
    });

    if (installPage) {
      revalidateTag(CoreApiTags.Core_Sessions__Authorization);
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
