'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Delete,
  Admin__Core_Languages__DeleteMutation,
  Admin__Core_Languages__DeleteMutationVariables,
} from '@/graphql/mutations/admin/languages/admin__core_languages__delete.generated';

export const mutationApi = async (
  variables: Admin__Core_Languages__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Languages__DeleteMutation,
      Admin__Core_Languages__DeleteMutationVariables
    >({
      query: Admin__Core_Languages__Delete,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
