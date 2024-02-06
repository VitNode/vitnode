"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Nav__Admin__Edit,
  type Core_Nav__Admin__EditMutation,
  type Core_Nav__Admin__EditMutationVariables
} from "@/graphql/hooks";

export const editMutationApi = async (
  variables: Core_Nav__Admin__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Nav__Admin__EditMutation,
      Core_Nav__Admin__EditMutationVariables
    >({
      query: Core_Nav__Admin__Edit,
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
