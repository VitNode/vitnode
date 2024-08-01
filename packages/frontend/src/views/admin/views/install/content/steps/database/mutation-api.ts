'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Install__Create_Database,
  Admin__Install__Create_DatabaseMutation,
  Admin__Install__Create_DatabaseMutationVariables,
} from '@/graphql/mutations/install/admin__install__create_database.generated';

export const mutationApi = async () => {
  try {
    await fetcher<
      Admin__Install__Create_DatabaseMutation,
      Admin__Install__Create_DatabaseMutationVariables
    >({
      query: Admin__Install__Create_Database,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/[locale]/admin/(vitnode)/install', 'page');
};
