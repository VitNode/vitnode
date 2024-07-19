'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Staff_Administrators__Delete,
  Admin__Core_Staff_Administrators__DeleteMutation,
  Admin__Core_Staff_Administrators__DeleteMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__DeleteMutationVariables,
) => {
  await fetcher<
    Admin__Core_Staff_Administrators__DeleteMutation,
    Admin__Core_Staff_Administrators__DeleteMutationVariables
  >({
    query: Admin__Core_Staff_Administrators__Delete,
    variables,
  });

  revalidatePath('/admin', 'layout');
};
