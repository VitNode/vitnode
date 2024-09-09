'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Delete,
  Admin__Core_Members__DeleteMutation,
  Admin__Core_Members__DeleteMutationVariables,
} from '@/graphql/mutations/admin/members/users/user/admin__core_members__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Members__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Members__DeleteMutation,
      Admin__Core_Members__DeleteMutationVariables
    >({
      query: Admin__Core_Members__Delete,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
