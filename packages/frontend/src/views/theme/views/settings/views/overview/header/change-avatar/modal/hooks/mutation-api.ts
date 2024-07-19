'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Avatar__Delete,
  Core_Members__Avatar__DeleteMutation,
  Core_Members__Avatar__DeleteMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async () => {
  const data = await fetcher<
    Core_Members__Avatar__DeleteMutation,
    Core_Members__Avatar__DeleteMutationVariables
  >({
    query: Core_Members__Avatar__Delete,
  });

  revalidatePath('/', 'layout');

  return data;
};
