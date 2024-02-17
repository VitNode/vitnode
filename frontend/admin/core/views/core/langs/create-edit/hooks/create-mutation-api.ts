"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  type Admin__Core_Languages__CreateMutationVariables,
  Admin__Core_Languages__Create
} from "@/graphql/hooks";

export const createMutationApi = async (
  variables: Admin__Core_Languages__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__CreateMutationVariables,
      Admin__Core_Languages__CreateMutationVariables
    >({
      query: Admin__Core_Languages__Create,
      variables
    });

    revalidatePath("/", "layout");
    revalidateTag("Core_Sessions__Authorization");
    revalidatePath("/admin/core/langs", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
