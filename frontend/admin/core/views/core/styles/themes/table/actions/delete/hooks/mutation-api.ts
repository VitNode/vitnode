"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Themes__Admin__Delete,
  type Core_Themes__Admin__DeleteMutation,
  type Core_Themes__Admin__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Core_Themes__Admin__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Themes__Admin__DeleteMutation,
      Core_Themes__Admin__DeleteMutationVariables
    >({
      query: Core_Themes__Admin__Delete,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
