'use server';

import { revalidatePath } from 'next/cache';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';

import {
  Admin__Blog_Categories__CreateMutation,
  Admin__Blog_Categories__Create,
  Admin__Blog_Categories__CreateMutationVariables,
} from '@/utils/graphql';

export const mutationCreateApi = async (
  variables: Admin__Blog_Categories__CreateMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Blog_Categories__CreateMutation,
      Admin__Blog_Categories__CreateMutationVariables
    >({
      query: Admin__Blog_Categories__Create,
      variables,
    });

    revalidatePath('/admin/blog/categories', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
