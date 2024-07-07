'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Plugins__Delete,
  Admin__Core_Plugins__DeleteMutation,
  Admin__Core_Plugins__DeleteMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationApi = async (
  variables: Admin__Core_Plugins__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__DeleteMutation,
      Admin__Core_Plugins__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Delete,
      variables,
    });

    revalidatePath('/', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
