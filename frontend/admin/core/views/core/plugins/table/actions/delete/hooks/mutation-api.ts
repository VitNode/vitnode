"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Delete,
  Admin__Core_Plugins__DeleteMutation,
  Admin__Core_Plugins__DeleteMutationVariables
} from "@/graphql/hooks";
import { cleanAdminCorePluginsCache } from "@/admin/core/api-tags";

export const mutationApi = async (
  variables: Admin__Core_Plugins__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__DeleteMutation,
      Admin__Core_Plugins__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Delete,
      variables
    });

    cleanAdminCorePluginsCache();

    return { data };
  } catch (error) {
    return { error };
  }
};
