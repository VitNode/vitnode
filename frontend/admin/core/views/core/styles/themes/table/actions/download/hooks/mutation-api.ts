"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Themes__Download,
  type Admin__Core_Themes__DownloadMutation,
  type Admin__Core_Themes__DownloadMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Themes__DownloadMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__DownloadMutation,
      Admin__Core_Themes__DownloadMutationVariables
    >({
      query: Admin__Core_Themes__Download,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    if (variables.version && variables.versionCode) {
      revalidatePath("/admin/core/styles/themes", "page");
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
