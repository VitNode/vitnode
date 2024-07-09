'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Groups__Create,
  Admin__Core_Groups__CreateMutation,
  Admin__Core_Groups__CreateMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationCreateApi = async (
  variables: Admin__Core_Groups__CreateMutationVariables,
) => {
  await fetcher<
    Admin__Core_Groups__CreateMutation,
    Admin__Core_Groups__CreateMutationVariables
  >({
    query: Admin__Core_Groups__Create,
    variables,
  });

  revalidatePath('/admin/members/groups', 'page');
};
