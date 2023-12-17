'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables
} from '@/graphql/hooks';
import { redirect } from '@/i18n';

export const mutationApi = async () => {
  try {
    await fetcher<Core_Sessions__Sign_OutMutation, Core_Sessions__Sign_OutMutationVariables>({
      query: Core_Sessions__Sign_Out,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    return { error };
  }

  redirect('/');
};
