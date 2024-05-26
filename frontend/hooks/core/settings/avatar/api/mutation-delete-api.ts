"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Members__Avatar__Delete,
  Core_Members__Avatar__DeleteMutation,
  Core_Members__Avatar__DeleteMutationVariables
} from "@/graphql/hooks";
import { CoreApiTags } from "@/admin/core/api-tags";

export const mutationDeleteApi = async () => {
  try {
    const { data } = await fetcher<
      Core_Members__Avatar__DeleteMutation,
      Core_Members__Avatar__DeleteMutationVariables
    >({
      query: Core_Members__Avatar__Delete
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);

    return { data };
  } catch (error) {
    return { error };
  }
};
