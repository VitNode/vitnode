'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Plugins__Admin__Create,
  type Core_Plugins__Admin__CreateMutation,
  type Core_Plugins__Admin__CreateMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Plugins__Admin__CreateMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Plugins__Admin__CreateMutation,
      Core_Plugins__Admin__CreateMutationVariables
    >({
      query: Core_Plugins__Admin__Create,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
