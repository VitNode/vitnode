"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Sessions__Sign_In,
  type Core_Sessions__Sign_InMutation,
  type Core_Sessions__Sign_InMutationVariables
} from "@/graphql/hooks";
import { redirect } from "@/i18n";

export const mutationApi = async (
  variables: Core_Sessions__Sign_InMutationVariables
): Promise<
  | {
      error: unknown;
    }
  | undefined
> => {
  try {
    await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables
    });

    revalidateTag("Core_Sessions__Authorization");
  } catch (error) {
    return { error };
  }

  revalidatePath(variables.admin ? "/admin" : "/", "layout");
  redirect(variables.admin ? "/admin/core/dashboard" : "/");
};
