'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Edit,
  type Core_Languages__EditMutation,
  type Core_Languages__EditMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Languages__EditMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Languages__EditMutation,
      Core_Languages__EditMutationVariables
    >({
      query: Core_Languages__Edit,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/admin', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
