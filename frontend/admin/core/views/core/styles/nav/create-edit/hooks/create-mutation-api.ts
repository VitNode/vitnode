"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Nav__Create,
  type Admin__Core_Nav__CreateMutation,
  type Admin__Core_Nav__CreateMutationVariables
} from "@/graphql/hooks";

export const createMutationApi = async (
  variables: Admin__Core_Nav__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav__CreateMutation,
      Admin__Core_Nav__CreateMutationVariables
    >({
      query: Admin__Core_Nav__Create,
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
