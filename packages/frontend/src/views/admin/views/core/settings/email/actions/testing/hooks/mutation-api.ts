'use server';

import {
  Admin__Core_Email_Settings__Test,
  Admin__Core_Email_Settings__TestMutation,
  Admin__Core_Email_Settings__TestMutationVariables,
} from '../../../../../../../../../graphql/code';
import { fetcher } from '../../../../../../../../../graphql/fetcher';

export const mutationApi = async (
  variables: Admin__Core_Email_Settings__TestMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Email_Settings__TestMutation,
      Admin__Core_Email_Settings__TestMutationVariables
    >({
      query: Admin__Core_Email_Settings__Test,
      variables,
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
