'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Manifest_Metadata__Edit,
  Admin__Core_Manifest_Metadata__EditMutation,
  Admin__Core_Manifest_Metadata__EditMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationApi = async (
  variables: Admin__Core_Manifest_Metadata__EditMutationVariables,
) => {
  const data = await fetcher<
    Admin__Core_Manifest_Metadata__EditMutation,
    Admin__Core_Manifest_Metadata__EditMutationVariables
  >({
    query: Admin__Core_Manifest_Metadata__Edit,
    variables,
  });

  revalidatePath('/', 'layout');

  return data;
};
