"use server";

import { revalidatePath } from "next/cache";

import {
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables
} from "@/utils/graphql/hooks";
import { redirect } from "@/utils/i18n";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationApi = async () => {
  try {
    await fetcher<
      Core_Sessions__Sign_OutMutation,
      Core_Sessions__Sign_OutMutationVariables
    >({
      query: Core_Sessions__Sign_Out
    });
  } catch (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
