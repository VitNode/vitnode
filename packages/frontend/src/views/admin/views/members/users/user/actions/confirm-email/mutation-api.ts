'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Confirm_Email,
  Admin__Core_Members__Confirm_EmailMutation,
  Admin__Core_Members__Confirm_EmailMutationVariables,
} from '@/graphql/mutations/admin/members/users/user/admin__core_members__confirm_email.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Members__Confirm_EmailMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Members__Confirm_EmailMutation,
      Admin__Core_Members__Confirm_EmailMutationVariables
    >({
      query: Admin__Core_Members__Confirm_Email,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
