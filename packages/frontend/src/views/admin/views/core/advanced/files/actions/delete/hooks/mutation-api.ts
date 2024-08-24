'use server';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Files__Delete,
  Admin__Core_Files__DeleteMutation,
  Admin__Core_Files__DeleteMutationVariables,
} from '@/graphql/mutations/admin/advanced/files/admin__core_files__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Files__DeleteMutationVariables,
) => {
  try {
    const data = await fetcher<
      Admin__Core_Files__DeleteMutation,
      Admin__Core_Files__DeleteMutationVariables
    >({
      query: Admin__Core_Files__Delete,
      variables,
    });

    revalidatePath('/admin/core/advanced/files', 'page');
    revalidatePath('/settings/files', 'page');

    return { data };
  } catch (e) {
    return { error: e as FetcherErrorType };
  }
};
