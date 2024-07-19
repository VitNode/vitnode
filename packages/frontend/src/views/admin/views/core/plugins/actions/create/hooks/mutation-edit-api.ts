'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Edit,
  Admin__Core_Plugins__EditMutation,
  Admin__Core_Plugins__EditMutationVariables,
} from '@/graphql/graphql';

export const mutationEditApi = async (
  variables: Admin__Core_Plugins__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__EditMutation,
      Admin__Core_Plugins__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Edit,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
