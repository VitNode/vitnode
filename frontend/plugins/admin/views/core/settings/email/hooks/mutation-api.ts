"use server";

import { fetcher } from "@/utils/graphql/fetcher";
import {
  Admin__Core_Email_Settings__Edit,
  Admin__Core_Email_Settings__EditMutation,
  Admin__Core_Email_Settings__EditMutationVariables
} from "@/utils/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Email_Settings__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Email_Settings__EditMutation,
      Admin__Core_Email_Settings__EditMutationVariables
    >({
      query: Admin__Core_Email_Settings__Edit,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
