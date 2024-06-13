"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Languages__CreateMutationVariables,
  Admin__Core_Languages__Create,
  Admin__Core_Languages__CreateMutation
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const createMutationApi = async (
  variables: Admin__Core_Languages__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__CreateMutation,
      Admin__Core_Languages__CreateMutationVariables
    >({
      query: Admin__Core_Languages__Create,
      variables
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/core/langs", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
