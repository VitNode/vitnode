'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import { Forum_Forums__Admin__Change_Position } from '@/graphql/hooks';
import type {
  Forum_Forums__Admin__Change_PositionMutation,
  Forum_Forums__Admin__Change_PositionMutationVariables
} from '@/graphql/hooks';

export const mutationChangePositionApi = async (
  variables: Forum_Forums__Admin__Change_PositionMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Forums__Admin__Change_PositionMutation,
      Forum_Forums__Admin__Change_PositionMutationVariables
    >({
      query: Forum_Forums__Admin__Change_Position,
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
