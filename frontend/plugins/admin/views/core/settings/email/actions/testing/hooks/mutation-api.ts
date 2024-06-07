"use server";

import { fetcher } from "@/utils/graphql/fetcher";
import {
  Admin__Core_Email_Settings__Test,
  Admin__Core_Email_Settings__TestMutation,
  Admin__Core_Email_Settings__TestMutationVariables
} from "@/utils/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Email_Settings__TestMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Email_Settings__TestMutation,
      Admin__Core_Email_Settings__TestMutationVariables
    >({
      query: Admin__Core_Email_Settings__Test,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
