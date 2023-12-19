'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Admin__Create,
  type Forum_Forums__Admin__CreateMutation,
  type Forum_Forums__Admin__CreateMutationVariables
} from '@/graphql/hooks';

export const mutationCreateApi = async (
  variables: Forum_Forums__Admin__CreateMutationVariables
) => {
  try {
    const data = await fetcher<
      Forum_Forums__Admin__CreateMutation,
      Forum_Forums__Admin__CreateMutationVariables
    >({
      query: Forum_Forums__Admin__Create,
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
