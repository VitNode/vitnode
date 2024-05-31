"use server";

import { revalidateTag } from "next/cache";

import {
  Admin__Core_Nav__Change_PositionMutation,
  Admin__Core_Nav__Change_PositionMutationVariables,
  Admin__Core_Nav__Change_Position
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { CoreApiTags } from "@/plugins/core/admin/api-tags";

export const mutationChangePositionApi = async (
  variables: Admin__Core_Nav__Change_PositionMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__Change_PositionMutation,
      Admin__Core_Nav__Change_PositionMutationVariables
    >({
      query: Admin__Core_Nav__Change_Position,
      variables
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);

    return { data };
  } catch (error) {
    return { error };
  }
};
