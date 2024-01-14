'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Posts__Create,
  type Forum_Posts__CreateMutation,
  type Forum_Posts__CreateMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Forum_Posts__CreateMutationVariables) => {
  try {
    const { data } = await fetcher<
      Forum_Posts__CreateMutation,
      Forum_Posts__CreateMutationVariables
    >({
      query: Forum_Posts__Create,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/topic/[id]', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
