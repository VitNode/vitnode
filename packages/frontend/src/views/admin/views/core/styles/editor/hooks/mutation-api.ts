'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Editor__Edit,
  Admin__Core_Styles__Editor__EditMutation,
  Admin__Core_Styles__Editor__EditMutationVariables,
} from '@/graphql/mutations/admin/styles/editor/admin__core_styles__editor__edit.generated';

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
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
