"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Languages__Edit,
  type Core_Languages__EditMutation,
  type Core_Languages__EditMutationVariables
} from "@/graphql/hooks";

export const editMutationApi = async (
  variables: Core_Languages__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Languages__EditMutation,
      Core_Languages__EditMutationVariables
    >({
      query: Core_Languages__Edit,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath("/", "layout");
    revalidateTag("Core_Sessions__Authorization");
    revalidatePath("/admin/core/langs", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
