'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Delete,
  Admin__Core_Languages__DeleteMutation,
  Admin__Core_Languages__DeleteMutationVariables,
} from '@/graphql/mutations/admin/languages/admin__core_languages__delete.generated';
import { revalidatePath } from 'next/cache';

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
    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
