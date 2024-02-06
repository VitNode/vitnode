"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin_Sessions__Sign_Out,
  type Admin_Sessions__Sign_OutMutation,
  type Admin_Sessions__Sign_OutMutationVariables
} from "@/graphql/hooks";
import { redirect } from "@/i18n";
import { setCookieFromApi } from "@/functions/cookie-from-string-to-object";

export const mutationApi = async () => {
  try {
    const { res } = await fetcher<
      Admin_Sessions__Sign_OutMutation,
      Admin_Sessions__Sign_OutMutationVariables
    >({
      query: Admin_Sessions__Sign_Out,
      headers: {
        Cookie: cookies().toString()
      }
    });

    // Set cookie
    setCookieFromApi({ res });

    revalidatePath("/admin", "layout");
  } catch (error) {
    return { error };
  }

  redirect("/admin");
};
