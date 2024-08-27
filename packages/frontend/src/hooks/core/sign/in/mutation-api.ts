'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables,
} from '@/graphql/mutations/sessions/core_sessions__sign_in.generated';
import { redirect } from '@/navigation';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Core_Sessions__Sign_InMutationVariables,
) => {
  try {
    await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables,
    });
  } catch (e) {
    return { error: e as string };
  }

  revalidatePath(variables.admin ? '/admin' : '/', 'layout');
  redirect(variables.admin ? '/admin/core/dashboard' : '/');
};
