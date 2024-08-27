'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Nav__Delete,
  Admin__Core_Styles__Nav__DeleteMutation,
  Admin__Core_Styles__Nav__DeleteMutationVariables,
} from '@/graphql/mutations/admin/styles/nav/core_styles__nav__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Styles__Nav__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Styles__Nav__DeleteMutation,
      Admin__Core_Styles__Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Styles__Nav__Delete,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/', 'layout');
};
