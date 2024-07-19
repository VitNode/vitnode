'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Editor_Files__Delete,
  Core_Editor_Files__DeleteMutation,
  Core_Editor_Files__DeleteMutationVariables,
} from '@/graphql/graphql';
import { fetcher, FetcherErrorType } from '@/graphql/fetcher';

export const deleteMutationApi = async (
  variables: Core_Editor_Files__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Core_Editor_Files__DeleteMutation,
      Core_Editor_Files__DeleteMutationVariables
    >({
      query: Core_Editor_Files__Delete,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/settings/files', 'page');
};
