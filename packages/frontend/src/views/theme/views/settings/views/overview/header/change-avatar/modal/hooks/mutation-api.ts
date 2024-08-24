'use server';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Core_Members__Avatar__Delete,
  Core_Members__Avatar__DeleteMutation,
  Core_Members__Avatar__DeleteMutationVariables,
} from '@/graphql/mutations/settings/avatar/core_members__avatar__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async () => {
  try {
    await fetcher<
      Core_Members__Avatar__DeleteMutation,
      Core_Members__Avatar__DeleteMutationVariables
    >({
      query: Core_Members__Avatar__Delete,
    });

    revalidatePath('/', 'layout');
  } catch (e) {
    return { error: e as FetcherErrorType };
  }
};
