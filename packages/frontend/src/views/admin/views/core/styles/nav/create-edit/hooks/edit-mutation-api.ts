'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Nav__Edit,
  Admin__Core_Styles__Nav__EditMutation,
  Admin__Core_Styles__Nav__EditMutationVariables,
} from '@/graphql/mutations/admin/styles/nav/core_styles__nav__edit.generated';
import { revalidatePath } from 'next/cache';

export const editMutationApi = async (
  variables: Admin__Core_Styles__Nav__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Styles__Nav__EditMutation,
      Admin__Core_Styles__Nav__EditMutationVariables
    >({
      query: Admin__Core_Styles__Nav__Edit,
      variables,
    });
    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
