'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Email_Settings__Edit,
  Admin__Core_Email_Settings__EditMutation,
  Admin__Core_Email_Settings__EditMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationApi = async (
  variables: Admin__Core_Email_Settings__EditMutationVariables,
) => {
  await fetcher<
    Admin__Core_Email_Settings__EditMutation,
    Admin__Core_Email_Settings__EditMutationVariables
  >({
    query: Admin__Core_Email_Settings__Edit,
    variables,
  });

  revalidatePath('/admin/core/settings/email', 'page');
};
