'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_Up,
  Core_Sessions__Sign_UpMutation,
  Core_Sessions__Sign_UpMutationVariables,
} from '@/graphql/mutations/sessions/core_Sessions__sign_up.generated';
import { revalidatePath } from 'next/cache';

interface Args extends Core_Sessions__Sign_UpMutationVariables {
  token: string;
}

export const mutationApi = async (variables: Args) => {
  try {
    await fetcher<
      Core_Sessions__Sign_UpMutation,
      Core_Sessions__Sign_UpMutationVariables
    >({
      query: Core_Sessions__Sign_Up,
      variables,
      headers: {
        'x-vitnode-captcha-token': variables.token,
      },
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/[locale]/(main)', 'page');
};
