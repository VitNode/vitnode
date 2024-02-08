"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Nav__Edit,
  type Admin__Core_Nav__EditMutation,
  type Admin__Core_Nav__EditMutationVariables
} from "@/graphql/hooks";

export const editMutationApi = async (
  variables: Admin__Core_Nav__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__EditMutation,
      Admin__Core_Nav__EditMutationVariables
    >({
      query: Admin__Core_Nav__Edit,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidateTag("Core_Sessions__Authorization");
    revalidatePath("/admin/core/styles/nav", "page");
    revalidatePath("/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
