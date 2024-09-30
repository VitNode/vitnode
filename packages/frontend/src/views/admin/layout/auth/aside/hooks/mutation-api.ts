'use server';

import { fetcher } from '@/graphql/fetcher';
import { getAdminIdCookie } from '@/graphql/get-user-id-cookie';
import {
  Admin_Sessions__Sign_Out,
  Admin_Sessions__Sign_OutMutation,
  Admin_Sessions__Sign_OutMutationVariables,
} from '@/graphql/mutations/admin/sessions/admin_sessions__sign_out.generated';
import { revalidateTags } from '@/graphql/revalidate-tags';
import { redirect } from '@/navigation';

export const mutationApi = async () => {
  try {
    await fetcher<
      Admin_Sessions__Sign_OutMutation,
      Admin_Sessions__Sign_OutMutationVariables
    >({
      query: Admin_Sessions__Sign_Out,
    });

    const adminIdFromCookie = getAdminIdCookie();
    if (adminIdFromCookie) {
      revalidateTags.sessionAdmin(+adminIdFromCookie);
    }
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  redirect('/admin');
};
