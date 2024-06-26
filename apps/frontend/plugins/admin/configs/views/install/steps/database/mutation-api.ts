'use server';

import { revalidatePath } from 'next/cache';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';

import {
  Admin__Install__Create_Database,
  Admin__Install__Create_DatabaseMutation,
  Admin__Install__Create_DatabaseMutationVariables,
} from '@/graphql/hooks';

export const mutationApi = async () => {
  try {
    const { data } = await fetcher<
      Admin__Install__Create_DatabaseMutation,
      Admin__Install__Create_DatabaseMutationVariables
    >({
      query: Admin__Install__Create_Database,
    });

    revalidatePath('/admin/install', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
