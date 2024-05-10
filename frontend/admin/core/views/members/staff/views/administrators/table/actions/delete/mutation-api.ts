"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Staff_Administrators__Delete,
  type Admin__Core_Staff_Administrators__DeleteMutation,
  type Admin__Core_Staff_Administrators__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Staff_Administrators__DeleteMutation,
      Admin__Core_Staff_Administrators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Administrators__Delete,
      variables
    });

    revalidatePath("/admin/members/staff/administrators", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
