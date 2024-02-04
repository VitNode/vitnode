'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  type Forum_Forums__Admin__Change_PositionMutation,
  type Forum_Forums__Admin__Change_PositionMutationVariables,
  Forum_Forums__Admin__Change_Position
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

    revalidateTag('Forum_Forums__Show');

    return { data };
  } catch (error) {
    return { error };
  }
};
