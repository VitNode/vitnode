'use server';

import { fetcher } from '@/graphql/fetcher';
import { getAdminIdCookie } from '@/graphql/get-user-id-cookie';
import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables,
} from '@/graphql/mutations/sessions/core_sessions__sign_in.generated';
import { revalidateTags } from '@/graphql/revalidate-tags';
import { redirect } from '@/navigation';
import { cookies } from 'next/headers';

export const mutationApi = async (
  variables: Core_Sessions__Sign_InMutationVariables,
) => {
  try {
    await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables,
    });

    const cookie = await cookies();
    if (!variables.admin) {
      const userIdFromCookie = cookie.get('vitnode-user-id')?.value;
      if (userIdFromCookie) {
        revalidateTags.session(+userIdFromCookie);
      }
    } else {
      const adminIdFromCookie = await getAdminIdCookie();
      if (adminIdFromCookie) {
        revalidateTags.sessionAdmin(+adminIdFromCookie);
      }
    }
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  if (variables.admin) {
    await redirect('/admin/core/dashboard');
  }
};
