"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Install__Create_Database,
  Admin__Install__Create_DatabaseMutation,
  Admin__Install__Create_DatabaseMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

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
