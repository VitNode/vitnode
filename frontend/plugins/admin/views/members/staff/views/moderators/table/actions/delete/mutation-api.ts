"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Staff_Moderators__Delete,
  Admin__Core_Staff_Moderators__DeleteMutation,
  Admin__Core_Staff_Moderators__DeleteMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Core_Staff_Moderators__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Staff_Moderators__DeleteMutation,
      Admin__Core_Staff_Moderators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Moderators__Delete,
      variables
    });

    revalidatePath("/admin/members/staff/moderators", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
