'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_Up,
  Core_Sessions__Sign_UpMutation,
  Core_Sessions__Sign_UpMutationVariables,
} from '@/graphql/mutations/sessions/core_Sessions__sign_up.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: {
    installPage?: boolean;
    token: string;
  } & Core_Sessions__Sign_UpMutationVariables,
) => {
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

    if (variables.installPage) {
      revalidatePath('/', 'layout');
    }
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
