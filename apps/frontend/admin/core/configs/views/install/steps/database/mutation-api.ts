"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Install__Create_Database,
  type Admin__Install__Create_DatabaseMutation,
  type Admin__Install__Create_DatabaseMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async () => {
  try {
    const { data } = await fetcher<
      Admin__Install__Create_DatabaseMutation,
      Admin__Install__Create_DatabaseMutationVariables
    >({
      query: Admin__Install__Create_Database
    });

    revalidatePath("/admin/(configs)/install/", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
