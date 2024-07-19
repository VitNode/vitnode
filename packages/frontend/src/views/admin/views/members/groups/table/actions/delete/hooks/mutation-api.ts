'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Groups__Delete,
  Admin__Core_Groups__DeleteMutation,
  Admin__Core_Groups__DeleteMutationVariables,
} from '@/graphql/graphql';
import { fetcher, FetcherErrorType } from '@/graphql/fetcher';

export const mutationApi = async (
  variables: Admin__Core_Groups__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Groups__DeleteMutation,
      Admin__Core_Groups__DeleteMutationVariables
    >({
      query: Admin__Core_Groups__Delete,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
