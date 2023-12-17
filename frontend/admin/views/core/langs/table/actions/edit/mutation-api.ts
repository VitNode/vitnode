'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Edit,
  Core_Languages__EditMutation,
  Core_Languages__EditMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Languages__EditMutationVariables) => {
  try {
    const data = await fetcher<Core_Languages__EditMutation, Core_Languages__EditMutationVariables>(
      {
        query: Core_Languages__Edit,
        variables,
        headers: {
          Cookie: cookies().toString()
        }
      }
    );

    return { data };
  } catch (error) {
    return { error };
  }
};
