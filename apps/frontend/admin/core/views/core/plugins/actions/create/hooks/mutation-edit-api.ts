"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Edit,
  type Admin__Core_Plugins__EditMutation,
  type Admin__Core_Plugins__EditMutationVariables
} from "@/graphql/hooks";
import { cleanAdminCorePluginsCache } from "@/admin/core/api-tags";

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
