'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Install__Create_Database,
  Admin_Install__Create_DatabaseMutation,
  Admin_Install__Create_DatabaseMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async () => {
  const mutation = await fetcher<
    Admin_Install__Create_DatabaseMutation,
    Admin_Install__Create_DatabaseMutationVariables
  >({
    query: Admin_Install__Create_Database,
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidatePath('/admin/(configs)/install/', 'layout');

  return mutation;
};
