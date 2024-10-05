'use server';

import { fetcher } from '@/graphql/fetcher';
import { getUserIdCookie } from '@/graphql/get-user-id-cookie';
import {
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables,
} from '@/graphql/mutations/sessions/core_sessions__sign_out.generated';
import { revalidateTags } from '@/graphql/revalidate-tags';

export const mutationApi = async () => {
  try {
    await fetcher<
      Core_Sessions__Sign_OutMutation,
      Core_Sessions__Sign_OutMutationVariables
    >({
      query: Core_Sessions__Sign_Out,
    });

    const userIdFromCookie = await getUserIdCookie();
    if (userIdFromCookie) {
      revalidateTags.session(+userIdFromCookie);
    }
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
