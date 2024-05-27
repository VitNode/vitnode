"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Groups__Edit,
  Admin__Core_Groups__EditMutation,
  Admin__Core_Groups__EditMutationVariables
} from "@/graphql/hooks";

export const mutationEditApi = async (
  variables: Admin__Core_Groups__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Groups__EditMutation,
      Admin__Core_Groups__EditMutationVariables
    >({
      query: Admin__Core_Groups__Edit,
      variables
    });

    revalidatePath("/admin/members/groups", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
