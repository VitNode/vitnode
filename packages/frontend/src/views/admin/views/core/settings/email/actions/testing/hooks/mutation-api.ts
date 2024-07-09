'use server';

import {
  Admin__Core_Email_Settings__Test,
  Admin__Core_Email_Settings__TestMutation,
  Admin__Core_Email_Settings__TestMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationApi = async (
  variables: Admin__Core_Email_Settings__TestMutationVariables,
) => {
  await fetcher<
    Admin__Core_Email_Settings__TestMutation,
    Admin__Core_Email_Settings__TestMutationVariables
  >({
    query: Admin__Core_Email_Settings__Test,
    variables,
  });
};
