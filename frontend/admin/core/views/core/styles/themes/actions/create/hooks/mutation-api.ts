'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Themes__Admin__Create,
  type Core_Themes__Admin__CreateMutation,
  type Core_Themes__Admin__CreateMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Themes__Admin__CreateMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Themes__Admin__CreateMutation,
      Core_Themes__Admin__CreateMutationVariables
    >({
      query: Core_Themes__Admin__Create,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/admin/core/styles/themes', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
