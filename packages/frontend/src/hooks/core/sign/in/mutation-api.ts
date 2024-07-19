'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';
import { redirect } from '@/navigation';

export const mutationApi = async (
  variables: Core_Sessions__Sign_InMutationVariables,
) => {
  await fetcher<
    Core_Sessions__Sign_InMutation,
    Core_Sessions__Sign_InMutationVariables
  >({
    query: Core_Sessions__Sign_In,
    variables,
  });

  revalidatePath(variables.admin ? '/admin' : '/', 'layout');
  redirect(variables.admin ? '/admin/core/dashboard' : '/');
};
