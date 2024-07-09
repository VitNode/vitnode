'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Groups__Edit,
  Admin__Core_Groups__EditMutation,
  Admin__Core_Groups__EditMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationEditApi = async (
  variables: Admin__Core_Groups__EditMutationVariables,
) => {
  await fetcher<
    Admin__Core_Groups__EditMutation,
    Admin__Core_Groups__EditMutationVariables
  >({
    query: Admin__Core_Groups__Edit,
    variables,
  });

  revalidatePath('/', 'layout');
};
