"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin_Install__Create_Database,
  type Admin_Install__Create_DatabaseMutation,
  type Admin_Install__Create_DatabaseMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async () => {
  try {
    const { data } = await fetcher<
      Admin_Install__Create_DatabaseMutation,
      Admin_Install__Create_DatabaseMutationVariables
    >({
      query: Admin_Install__Create_Database,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath("/admin/(configs)/install/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
