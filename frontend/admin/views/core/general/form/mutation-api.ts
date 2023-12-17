'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Settings__General__Edit,
  Admin_Settings__General__EditMutation,
  Admin_Settings__General__EditMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Admin_Settings__General__EditMutationVariables) => {
  try {
    const data = await fetcher<
      Admin_Settings__General__EditMutation,
      Admin_Settings__General__EditMutationVariables
    >({
      query: Admin_Settings__General__Edit,
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
