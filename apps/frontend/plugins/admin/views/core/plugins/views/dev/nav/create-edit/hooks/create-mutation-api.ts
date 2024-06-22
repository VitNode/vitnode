"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Plugins__Nav__Create,
  Admin__Core_Plugins__Nav__CreateMutation,
  Admin__Core_Plugins__Nav__CreateMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const createMutationApi = async (
  variables: Admin__Core_Plugins__Nav__CreateMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__Nav__CreateMutation,
      Admin__Core_Plugins__Nav__CreateMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Create,
      variables,
    });

    revalidatePath(
      `/admin/core/plugins/${variables.pluginCode}/dev/nav`,
      "page",
    );

    return { data };
  } catch (error) {
    return { error };
  }
};
