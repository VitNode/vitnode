'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Ai__Edit,
  Admin__Core_Ai__EditMutation,
  Admin__Core_Ai__EditMutationVariables,
} from '@/graphql/mutations/admin/ai/admin__core_ai__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Ai__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Ai__EditMutation,
      Admin__Core_Ai__EditMutationVariables
    >({
      query: Admin__Core_Ai__Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
