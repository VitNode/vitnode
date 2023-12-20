'use server';

import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_In,
  type Core_Sessions__Sign_InMutation,
  type Core_Sessions__Sign_InMutationVariables
} from '@/graphql/hooks';
import { redirect } from '@/i18n';
import { cookieFromStringToObject } from '@/functions/cookie-from-string-to-object';

export const mutationApi = async (variables: Core_Sessions__Sign_InMutationVariables) => {
  try {
    const { res } = await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables,
      headers: {
        Cookie: cookies().toString(),
        ['user-agent']: headers().get('user-agent') ?? 'node'
      }
    });

    // Set cookie
    cookieFromStringToObject(res.headers.getSetCookie()).forEach(cookie => {
      const key = Object.keys(cookie)[0];
      const value = Object.values(cookie)[0];

      if (typeof value !== 'string' || typeof key !== 'string') return;

      cookies().set(key, value, {
        domain: cookie.Domain,
        path: cookie.Path,
        expires: new Date(cookie.Expires),
        secure: cookie.Secure,
        httpOnly: cookie.HttpOnly,
        sameSite: cookie.SameSite
      });
    });
  } catch (error) {
    return { error };
  }

  revalidatePath(variables.admin ? '/admin' : '/', 'layout');
  redirect(variables.admin ? '/admin/core/dashboard' : '/');
};
