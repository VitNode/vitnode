'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Groups__Admin_Create,
  Core_Groups__Admin_CreateMutation,
  Core_Groups__Admin_CreateMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationCreateApi = async (
  variables: Core_Groups__Admin_CreateMutationVariables,
) => {
  await fetcher<
    Core_Groups__Admin_CreateMutation,
    Core_Groups__Admin_CreateMutationVariables
  >({
    query: Core_Groups__Admin_Create,
    variables,
  });

  revalidatePath('/admin/members/groups', 'page');
};
