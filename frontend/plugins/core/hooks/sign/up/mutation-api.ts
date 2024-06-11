"use server";

import { revalidateTag } from "next/cache";

import {
  Core_Members__Sign_Up,
  Core_Members__Sign_UpMutation,
  Core_Members__Sign_UpMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import { CoreApiTags } from "@/plugins/admin/api-tags";

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
