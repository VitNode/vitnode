'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Staff_Administrators__Admin__Delete,
  type Core_Staff_Administrators__Admin__DeleteMutation,
  type Core_Staff_Administrators__Admin__DeleteMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (
  variables: Core_Staff_Administrators__Admin__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Staff_Administrators__Admin__DeleteMutation,
      Core_Staff_Administrators__Admin__DeleteMutationVariables
    >({
      query: Core_Staff_Administrators__Admin__Delete,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/admin/members/staff/administrators', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
