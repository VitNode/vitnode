"use server";

import {
  Admin__Core_Plugins__Edit,
  Admin__Core_Plugins__EditMutation,
  Admin__Core_Plugins__EditMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

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

    return { data };
  } catch (error) {
    return { error };
  }
};
