'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import {
  Forum_Topics__Create,
  Forum_Topics__CreateMutation,
  Forum_Topics__CreateMutationVariables
} from '@/graphql/hooks';
import { fetcher } from '@/graphql/fetcher';

export const mutationApi = async (variables: Forum_Topics__CreateMutationVariables) => {
  const mutation = await fetcher<
    Forum_Topics__CreateMutation,
    Forum_Topics__CreateMutationVariables
  >({
    query: Forum_Topics__Create,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidatePath('/forum/[id]', 'page');

  return mutation;
};
