'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Groups__Edit,
  Admin__Core_Groups__EditMutation,
  Admin__Core_Groups__EditMutationVariables,
} from '@/graphql/mutations/admin/members/groups/admin__core_groups__edit.generated';

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
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
