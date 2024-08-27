'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Groups__Create,
  Admin__Core_Groups__CreateMutation,
  Admin__Core_Groups__CreateMutationVariables,
} from '@/graphql/mutations/admin/members/groups/admin__core_groups__create.generated';
import { revalidatePath } from 'next/cache';

export const mutationCreateApi = async (
  variables: Admin__Core_Groups__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Groups__CreateMutation,
      Admin__Core_Groups__CreateMutationVariables
    >({
      query: Admin__Core_Groups__Create,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/admin/members/groups', 'page');
};
