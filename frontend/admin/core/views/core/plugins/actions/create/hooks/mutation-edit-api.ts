"use server";

import {
  Admin__Core_Plugins__Edit,
  Admin__Core_Plugins__EditMutation,
  Admin__Core_Plugins__EditMutationVariables
} from "@/utils/graphql/hooks";
import { cleanAdminCorePluginsCache } from "@/admin/core/api-tags";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationEditApi = async (
  variables: Admin__Core_Plugins__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__EditMutation,
      Admin__Core_Plugins__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Edit,
      variables
    });

    cleanAdminCorePluginsCache();

    return { data };
  } catch (error) {
    return { error };
  }
};
