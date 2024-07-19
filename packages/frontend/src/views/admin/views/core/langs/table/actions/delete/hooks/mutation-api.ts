'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Delete,
  Admin__Core_Languages__DeleteMutation,
  Admin__Core_Languages__DeleteMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Languages__DeleteMutationVariables,
) => {
  await fetcher<
    Admin__Core_Languages__DeleteMutation,
    Admin__Core_Languages__DeleteMutationVariables
  >({
    query: Admin__Core_Languages__Delete,
    variables,
  });

  revalidatePath('/', 'layout');
};
