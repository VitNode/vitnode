"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "@vitnode/frontend/navigation";

import {
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async () => {
  try {
    await fetcher<
      Core_Sessions__Sign_OutMutation,
      Core_Sessions__Sign_OutMutationVariables
    >({
      query: Core_Sessions__Sign_Out,
    });
  } catch (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
