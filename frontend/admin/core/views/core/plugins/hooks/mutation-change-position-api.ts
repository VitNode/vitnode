'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import { Core_Plugins__Admin__Change_Position } from '@/graphql/hooks';
import type {
  Core_Plugins__Admin__Change_PositionMutation,
  Core_Plugins__Admin__Change_PositionMutationVariables
} from '@/graphql/hooks';

export const mutationChangePositionApi = async (
  variables: Core_Plugins__Admin__Change_PositionMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Plugins__Admin__Change_PositionMutation,
      Core_Plugins__Admin__Change_PositionMutationVariables
    >({
      query: Core_Plugins__Admin__Change_Position,
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
