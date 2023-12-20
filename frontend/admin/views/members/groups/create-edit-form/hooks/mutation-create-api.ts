'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin_Create,
  type Core_Groups__Admin_CreateMutation,
  type Core_Groups__Admin_CreateMutationVariables
} from '@/graphql/hooks';

export const mutationCreateApi = async (variables: Core_Groups__Admin_CreateMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Groups__Admin_CreateMutation,
      Core_Groups__Admin_CreateMutationVariables
    >({
      query: Core_Groups__Admin_Create,
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
