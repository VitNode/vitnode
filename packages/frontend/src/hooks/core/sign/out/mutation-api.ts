'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables,
} from '@/graphql/mutations/sessions/core_sessions__sign_out.generated';
import { redirect } from '@/navigation';
import { revalidatePath } from 'next/cache';

export const mutationApi = async () => {
  try {
    await fetcher<
      Core_Sessions__Sign_OutMutation,
      Core_Sessions__Sign_OutMutationVariables
    >({
      query: Core_Sessions__Sign_Out,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/', 'page');
  redirect('/');
};
