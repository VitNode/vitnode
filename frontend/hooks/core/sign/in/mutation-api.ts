'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables
} from '@/graphql/hooks';
import { redirect } from '@/i18n';
import { convertUnixTime, currentDate } from '@/functions/date';

import { CONFIG } from '../../../../config';

export const mutationApi = async (variables: Core_Sessions__Sign_InMutationVariables) => {
  try {
    const mutation = await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    cookies().set(
      variables.admin ? CONFIG.admin.refresh_token : CONFIG.refresh_token,
      mutation.core_sessions__sign_in,
      {
        httpOnly: true,
        secure: true,
        path: '/',
        expires:
          variables.remember && !variables.admin
            ? new Date(convertUnixTime(currentDate() + 60 * 60 * 24 * 90))
            : undefined,
        sameSite: 'none'
      }
    );
  } catch (error) {
    return { error };
  }

  revalidatePath(variables.admin ? '/admin' : '/', 'layout');
  redirect(variables.admin ? '/admin/core/dashboard' : '/');
};
