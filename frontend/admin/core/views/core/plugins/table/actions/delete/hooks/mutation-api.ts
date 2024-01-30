'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Plugins__Admin__Delete,
  type Core_Plugins__Admin__DeleteMutation,
  type Core_Plugins__Admin__DeleteMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Plugins__Admin__DeleteMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Plugins__Admin__DeleteMutation,
      Core_Plugins__Admin__DeleteMutationVariables
    >({
      query: Core_Plugins__Admin__Delete,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/admin/core/plugins', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
