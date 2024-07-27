'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Sessions__Sign_Up,
  Core_Sessions__Sign_UpMutation,
  Core_Sessions__Sign_UpMutationVariables,
} from '@/graphql/graphql';
import { FetcherErrorType, fetcher } from '@/graphql/fetcher';

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
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/[locale]/(main)', 'page');
};
