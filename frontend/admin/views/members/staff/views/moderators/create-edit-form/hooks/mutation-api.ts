'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Staff_Moderators__Admin__Create,
  type Core_Staff_Moderators__Admin__CreateMutation,
  type Core_Staff_Moderators__Admin__CreateMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (
  variables: Core_Staff_Moderators__Admin__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Staff_Moderators__Admin__CreateMutation,
      Core_Staff_Moderators__Admin__CreateMutationVariables
    >({
      query: Core_Staff_Moderators__Admin__Create,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/admin/members/staff/moderators', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
