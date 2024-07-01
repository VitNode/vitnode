'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Sessions__Sign_Up,
  Core_Sessions__Sign_UpMutation,
  Core_Sessions__Sign_UpMutationVariables,
} from '../../../../graphql/graphql';
import { fetcher } from '../../../../graphql/fetcher';

export const mutationApi = async (
  variables: Core_Sessions__Sign_UpMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Core_Sessions__Sign_UpMutation,
      Core_Sessions__Sign_UpMutationVariables
    >({
      query: Core_Sessions__Sign_Up,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
