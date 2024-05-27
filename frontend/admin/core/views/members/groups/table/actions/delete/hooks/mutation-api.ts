"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Groups__Delete,
  Admin__Core_Groups__DeleteMutation,
  Admin__Core_Groups__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Groups__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Groups__DeleteMutation,
      Admin__Core_Groups__DeleteMutationVariables
    >({
      query: Admin__Core_Groups__Delete,
      variables
    });

    revalidatePath("/admin/members/groups", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
