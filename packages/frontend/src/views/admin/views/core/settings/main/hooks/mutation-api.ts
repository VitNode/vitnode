'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Main_Settings__Edit,
  Admin__Core_Main_Settings__EditMutation,
  Admin__Core_Main_Settings__EditMutationVariables,
} from '@/graphql/mutations/admin/settings/admin__core_main_settings__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Main_Settings__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Main_Settings__EditMutation,
      Admin__Core_Main_Settings__EditMutationVariables
    >({
      query: Admin__Core_Main_Settings__Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
