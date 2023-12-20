'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import { Core_Groups__Admin__Edit } from '@/graphql/hooks';
import type {
  Core_Groups__Admin__EditMutation,
  Core_Groups__Admin__EditMutationVariables
} from '@/graphql/hooks';

export const mutationEditApi = async (variables: Core_Groups__Admin__EditMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Groups__Admin__EditMutation,
      Core_Groups__Admin__EditMutationVariables
    >({
      query: Core_Groups__Admin__Edit,
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
