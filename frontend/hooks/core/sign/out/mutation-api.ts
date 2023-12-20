'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_Out,
  type Core_Sessions__Sign_OutMutation,
  type Core_Sessions__Sign_OutMutationVariables
} from '@/graphql/hooks';
import { redirect } from '@/i18n';
import { CONFIG } from '@/config';

export const mutationApi = async () => {
  try {
    await fetcher<Core_Sessions__Sign_OutMutation, Core_Sessions__Sign_OutMutationVariables>({
      query: Core_Sessions__Sign_Out,
      headers: {
        Cookie: cookies().toString()
      }
    });

    cookies().delete(CONFIG.cookies.login_token.name);

    revalidatePath('/', 'layout');
  } catch (error) {
    return { error };
  }

  redirect('/');
};
