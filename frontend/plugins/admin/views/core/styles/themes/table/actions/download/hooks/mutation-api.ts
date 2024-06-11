"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Themes__Download,
  Admin__Core_Themes__DownloadMutation,
  Admin__Core_Themes__DownloadMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Core_Themes__DownloadMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Themes__DownloadMutation,
      Admin__Core_Themes__DownloadMutationVariables
    >({
      query: Admin__Core_Themes__Download,
      variables
    });

    if (variables.version && variables.versionCode) {
      revalidatePath("/admin/core/styles/themes", "page");
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
