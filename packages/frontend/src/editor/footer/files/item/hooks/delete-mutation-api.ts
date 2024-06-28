'use server';

import { revalidatePath } from 'next/cache';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';
import {
  Core_Editor_Files__Delete,
  Core_Editor_Files__DeleteMutation,
  Core_Editor_Files__DeleteMutationVariables,
} from '../../../../../graphql/code';

export const deleteMutationApi = async (
  variables: Core_Editor_Files__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Core_Editor_Files__DeleteMutation,
      Core_Editor_Files__DeleteMutationVariables
    >({
      query: Core_Editor_Files__Delete,
      variables,
    });

    revalidatePath('/settings/files', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
