'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Groups__Edit,
  Admin__Core_Groups__EditMutation,
  Admin__Core_Groups__EditMutationVariables,
} from '@/graphql/mutations/admin/members/groups/admin__core_groups__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationEditApi = async (
  variables: Admin__Core_Groups__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Groups__EditMutation,
      Admin__Core_Groups__EditMutationVariables
    >({
      query: Admin__Core_Groups__Edit,
      variables,
    });
    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
