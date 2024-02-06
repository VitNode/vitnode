'use server';

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Nav__Admin__Delete,
  type Core_Nav__Admin__DeleteMutation,
  type Core_Nav__Admin__DeleteMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Nav__Admin__DeleteMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Nav__Admin__DeleteMutation,
      Core_Nav__Admin__DeleteMutationVariables
    >({
      query: Core_Nav__Admin__Delete,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidateTag('Core_Sessions__Authorization');
    revalidatePath('/admin/core/styles/nav', 'page');
    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
