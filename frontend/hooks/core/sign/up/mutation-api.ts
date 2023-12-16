'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Sign_Up,
  Core_Members__Sign_UpMutation,
  Core_Members__Sign_UpMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Members__Sign_UpMutationVariables) => {
  const mutation = fetcher<Core_Members__Sign_UpMutation, Core_Members__Sign_UpMutationVariables>({
    query: Core_Members__Sign_Up,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return mutation;
};
