'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Create,
  Admin__Core_Plugins__CreateMutation,
  Admin__Core_Plugins__CreateMutationVariables,
} from '@/graphql/graphql';

export const mutationCreateApi = async (
  variables: Admin__Core_Plugins__CreateMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__CreateMutation,
      Admin__Core_Plugins__CreateMutationVariables
    >({
      query: Admin__Core_Plugins__Create,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
