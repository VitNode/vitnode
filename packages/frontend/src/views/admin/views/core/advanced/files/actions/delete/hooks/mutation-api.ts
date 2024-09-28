'use server';

import { fetcher } from '@/graphql/fetcher';
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

    revalidatePath(
      '/[locale]/admin/(auth)/(vitnode)/core/advanced/files',
      'page',
    );

    return { data };
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
