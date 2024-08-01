'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Nav__Delete,
  Admin__Core_Styles__Nav__DeleteMutation,
  Admin__Core_Styles__Nav__DeleteMutationVariables,
} from '@/graphql/mutations/admin/styles/nav/core_styles__nav__delete.generated';

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
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
