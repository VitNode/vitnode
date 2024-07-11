'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Edit,
  Admin__Core_Plugins__EditMutation,
  Admin__Core_Plugins__EditMutationVariables,
} from '@/graphql/graphql';

export const mutationEditApi = async (
  variables: Admin__Core_Plugins__EditMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__EditMutation,
      Admin__Core_Plugins__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Edit,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
