"use server";

import {
  Admin__Core_Plugins__Download,
  Admin__Core_Plugins__DownloadMutation,
  Admin__Core_Plugins__DownloadMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { cleanAdminCorePluginsCache } from "@/plugins/core/admin/api-tags";

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
