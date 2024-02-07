"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Themes__Admin__Edit,
  type Core_Themes__Admin__EditMutation,
  type Core_Themes__Admin__EditMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Core_Themes__Admin__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Themes__Admin__EditMutation,
      Core_Themes__Admin__EditMutationVariables
    >({
      query: Core_Themes__Admin__Edit,
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
