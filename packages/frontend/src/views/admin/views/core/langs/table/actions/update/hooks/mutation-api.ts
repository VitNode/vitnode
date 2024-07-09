'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Update,
  Admin__Core_Languages__UpdateMutation,
  Admin__Core_Languages__UpdateMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async (formData: FormData) => {
  const files = formData.get('file') as File;
  const code = formData.get('code') as string;

  await fetcher<
    Admin__Core_Languages__UpdateMutation,
    Omit<Admin__Core_Languages__UpdateMutationVariables, 'file'>
  >({
    query: Admin__Core_Languages__Update,
    uploads: [
      {
        files,
        variable: 'file',
      },
    ],
    variables: {
      code,
    },
  });

  revalidatePath('/', 'layout');
};
