"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "@vitnode/frontend/navigation";

import {
  Admin_Sessions__Sign_Out,
  Admin_Sessions__Sign_OutMutation,
  Admin_Sessions__Sign_OutMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

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
