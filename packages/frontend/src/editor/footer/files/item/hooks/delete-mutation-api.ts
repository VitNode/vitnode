'use server';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Core_Editor_Files__Delete,
  Core_Editor_Files__DeleteMutation,
  Core_Editor_Files__DeleteMutationVariables,
} from '@/graphql/mutations/editor/core_editor_files__delete.generated';
import { revalidatePath } from 'next/cache';

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
