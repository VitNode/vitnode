'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Create,
  Admin__Core_Languages__CreateMutation,
  Admin__Core_Languages__CreateMutationVariables,
} from '@/graphql/graphql';

export const createMutationApi = async (
  variables: Admin__Core_Languages__CreateMutationVariables,
) => {
  await fetcher<
    Admin__Core_Languages__CreateMutation,
    Admin__Core_Languages__CreateMutationVariables
  >({
    query: Admin__Core_Languages__Create,
    variables,
  });

  revalidatePath('/', 'layout');
};
