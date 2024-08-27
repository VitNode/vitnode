'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Staff_Administrators__Create,
  Admin__Core_Staff_Administrators__CreateMutation,
  Admin__Core_Staff_Administrators__CreateMutationVariables,
} from '@/graphql/mutations/admin/members/staff/administrators/admin__core_staff_administrators__create.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Staff_Administrators__CreateMutation,
      Admin__Core_Staff_Administrators__CreateMutationVariables
    >({
      query: Admin__Core_Staff_Administrators__Create,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/admin', 'layout');
};
