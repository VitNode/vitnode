'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Sessions__Sign_Out,
  Admin_Sessions__Sign_OutMutation,
  Admin_Sessions__Sign_OutMutationVariables
} from '@/graphql/hooks';
import { redirect } from '@/i18n';
import { CONFIG } from '@/config';

export const mutationApi = async () => {
  try {
    async () =>
      await fetcher<Admin_Sessions__Sign_OutMutation, Admin_Sessions__Sign_OutMutationVariables>({
        query: Admin_Sessions__Sign_Out,
        headers: {
          Cookie: cookies().toString()
        }
      });

    cookies().delete(CONFIG.login_token.admin.name);

    revalidatePath('/admin', 'layout');
  } catch (error) {
    return { error };
  }

  redirect('/admin');
};
