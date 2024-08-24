'use server';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin_Sessions__Sign_Out,
  Admin_Sessions__Sign_OutMutation,
  Admin_Sessions__Sign_OutMutationVariables,
} from '@/graphql/mutations/admin/sessions/admin_sessions__sign_out.generated';
import { redirect } from '@/navigation';
import { revalidatePath } from 'next/cache';

export const mutationApi = async () => {
  try {
    await fetcher<
      Admin_Sessions__Sign_OutMutation,
      Admin_Sessions__Sign_OutMutationVariables
    >({
      query: Admin_Sessions__Sign_Out,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/admin', 'layout');
  redirect('/admin');
};
