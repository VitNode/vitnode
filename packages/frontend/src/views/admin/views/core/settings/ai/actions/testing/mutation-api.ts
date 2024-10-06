'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Ai__Test,
  Admin__Core_Ai__TestMutation,
  Admin__Core_Ai__TestMutationVariables,
} from '@/graphql/mutations/admin/ai/admin__core_ai__test.generated';

export const mutationApi = async (
  variables: Admin__Core_Ai__TestMutationVariables,
) => {
  try {
    const data = await fetcher<
      Admin__Core_Ai__TestMutation,
      Admin__Core_Ai__TestMutationVariables
    >({
      query: Admin__Core_Ai__Test,
      variables,
    });

    return { data: data.admin__core_ai__test };
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
