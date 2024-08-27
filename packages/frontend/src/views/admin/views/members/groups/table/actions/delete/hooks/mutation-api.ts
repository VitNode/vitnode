'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Groups__Delete,
  Admin__Core_Groups__DeleteMutation,
  Admin__Core_Groups__DeleteMutationVariables,
} from '@/graphql/mutations/admin/members/groups/admin__core_groups__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Groups__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Groups__DeleteMutation,
      Admin__Core_Groups__DeleteMutationVariables
    >({
      query: Admin__Core_Groups__Delete,
      variables,
    });
  } catch (e) {
    return { error: e as string };
  }

  revalidatePath('/', 'layout');
};
