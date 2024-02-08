"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Staff_Moderators__Delete,
  type Admin__Core_Staff_Moderators__DeleteMutation,
  type Admin__Core_Staff_Moderators__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Staff_Moderators__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Staff_Moderators__DeleteMutation,
      Admin__Core_Staff_Moderators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Moderators__Delete,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath("/admin/members/staff/moderators", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
