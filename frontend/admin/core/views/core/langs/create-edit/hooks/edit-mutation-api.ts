"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin_Core_Languages__Edit,
  type Admin_Core_Languages__EditMutation,
  type Admin_Core_Languages__EditMutationVariables
} from "@/graphql/hooks";

export const editMutationApi = async (
  variables: Admin_Core_Languages__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin_Core_Languages__EditMutation,
      Admin_Core_Languages__EditMutationVariables
    >({
      query: Admin_Core_Languages__Edit,
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
