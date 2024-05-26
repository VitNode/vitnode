"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Download,
  Admin__Core_Plugins__DownloadMutation,
  Admin__Core_Plugins__DownloadMutationVariables
} from "@/graphql/hooks";
import { cleanAdminCorePluginsCache } from "@/admin/core/api-tags";

export const mutationApi = async (
  variables: Admin__Core_Plugins__DownloadMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__DownloadMutation,
      Admin__Core_Plugins__DownloadMutationVariables
    >({
      query: Admin__Core_Plugins__Download,
      variables
    });

    if (variables.version && variables.versionCode) {
      cleanAdminCorePluginsCache();
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
