'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_Out,
  type Core_Sessions__Sign_OutMutation,
  type Core_Sessions__Sign_OutMutationVariables
} from '@/graphql/hooks';
import { redirect } from '@/i18n';
import { setCookieFromApi } from '@/functions/cookie-from-string-to-object';

export const mutationApi = async () => {
  try {
    const { res } = await fetcher<
      Core_Sessions__Sign_OutMutation,
      Core_Sessions__Sign_OutMutationVariables
    >({
      query: Core_Sessions__Sign_Out,
      headers: {
        Cookie: cookies().toString()
      }
    });

    // Set cookie
    setCookieFromApi({ res });
    revalidateTag('Core_Sessions__Authorization');
  } catch (error) {
    return { error };
  }

  redirect('/');
};
