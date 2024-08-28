'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Create,
  Admin__Core_Members__CreateMutation,
  Admin__Core_Members__CreateMutationVariables,
} from '@/graphql/mutations/admin/members/users/admin__core_members__create.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Members__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Members__CreateMutation,
      Admin__Core_Members__CreateMutationVariables
    >({
      query: Admin__Core_Members__Create,
      variables,
    });

    revalidatePath('/admin/members/users', 'page');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
