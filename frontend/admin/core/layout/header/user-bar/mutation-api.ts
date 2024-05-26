"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin_Sessions__Sign_Out,
  Admin_Sessions__Sign_OutMutation,
  Admin_Sessions__Sign_OutMutationVariables
} from "@/graphql/hooks";
import { redirect } from "@/utils/i18n";

export const mutationApi = async () => {
  try {
    await fetcher<
      Admin_Sessions__Sign_OutMutation,
      Admin_Sessions__Sign_OutMutationVariables
    >({
      query: Admin_Sessions__Sign_Out
    });

    revalidatePath("/admin", "layout");
  } catch (error) {
    return { error };
  }

  redirect("/admin");
};
