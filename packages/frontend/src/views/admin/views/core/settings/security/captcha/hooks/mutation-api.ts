'use server';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Security__Captcha__Edit,
  Admin__Core_Security__Captcha__EditMutation,
  Admin__Core_Security__Captcha__EditMutationVariables,
} from '@/graphql/mutations/admin/security/admin__core_security__captcha__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Security__Captcha__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Security__Captcha__EditMutation,
      Admin__Core_Security__Captcha__EditMutationVariables
    >({
      query: Admin__Core_Security__Captcha__Edit,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
