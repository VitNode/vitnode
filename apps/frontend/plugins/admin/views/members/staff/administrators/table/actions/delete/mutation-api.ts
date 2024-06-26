"use server";

import { revalidatePath } from "next/cache";
import { fetcher } from "vitnode-frontend/graphql/fetcher";

import {
  Admin__Core_Staff_Administrators__Delete,
  Admin__Core_Staff_Administrators__DeleteMutation,
  Admin__Core_Staff_Administrators__DeleteMutationVariables,
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Staff_Administrators__DeleteMutation,
      Admin__Core_Staff_Administrators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Administrators__Delete,
      variables,
    });

    revalidatePath("/admin", "layout");

    return { data };
  } catch (error) {
    return { error };
  }
};
