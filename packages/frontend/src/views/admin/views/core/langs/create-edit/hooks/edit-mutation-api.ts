'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Edit,
  Admin__Core_Languages__EditMutation,
  Admin__Core_Languages__EditMutationVariables,
} from '@/graphql/mutations/admin/languages/admin__core_languages__edit.generated';
import { revalidatePath } from 'next/cache';

export const editMutationApi = async (
  variables: Admin__Core_Languages__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Languages__EditMutation,
      Admin__Core_Languages__EditMutationVariables
    >({
      query: Admin__Core_Languages__Edit,
      variables,
    });
    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
