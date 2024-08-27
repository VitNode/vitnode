'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Editor__Edit,
  Admin__Core_Styles__Editor__EditMutation,
  Admin__Core_Styles__Editor__EditMutationVariables,
} from '@/graphql/mutations/admin/styles/editor/admin__core_styles__editor__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Styles__Editor__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Styles__Editor__EditMutation,
      Admin__Core_Styles__Editor__EditMutationVariables
    >({
      query: Admin__Core_Styles__Editor__Edit,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/', 'layout');
};
