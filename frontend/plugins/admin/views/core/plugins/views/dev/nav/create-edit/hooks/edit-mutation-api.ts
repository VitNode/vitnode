"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Plugins__Nav__Edit,
  Admin__Core_Plugins__Nav__EditMutation,
  Admin__Core_Plugins__Nav__EditMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

interface Args extends Admin__Core_Plugins__Nav__EditMutationVariables {
  pluginCode: string;
}

export const editMutationApi = async (variables: Args) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__Nav__EditMutation,
      Admin__Core_Plugins__Nav__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Edit,
      variables
    });

    revalidatePath(
      `/admin/core/plugins/${variables.pluginCode}/dev/nav`,
      "page"
    );

    return { data };
  } catch (error) {
    return { error };
  }
};
