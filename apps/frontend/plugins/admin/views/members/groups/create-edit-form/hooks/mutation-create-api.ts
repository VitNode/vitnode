"use server";

import { revalidatePath } from "next/cache";
import { fetcher } from "vitnode-frontend/graphql/fetcher";

import {
  Core_Groups__Admin_Create,
  Core_Groups__Admin_CreateMutation,
  Core_Groups__Admin_CreateMutationVariables,
} from "@/graphql/hooks";

export const mutationCreateApi = async (
  variables: Core_Groups__Admin_CreateMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Core_Groups__Admin_CreateMutation,
      Core_Groups__Admin_CreateMutationVariables
    >({
      query: Core_Groups__Admin_Create,
      variables,
    });

    revalidatePath("/admin/members/groups", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
