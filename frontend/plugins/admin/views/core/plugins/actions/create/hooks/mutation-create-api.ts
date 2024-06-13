"use server";

import {
  Admin__Core_Plugins__Create,
  Admin__Core_Plugins__CreateMutation,
  Admin__Core_Plugins__CreateMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationCreateApi = async (
  variables: Admin__Core_Plugins__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__CreateMutation,
      Admin__Core_Plugins__CreateMutationVariables
    >({
      query: Admin__Core_Plugins__Create,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
