'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Staff_Administrators__Delete,
  Admin__Core_Staff_Administrators__DeleteMutation,
  Admin__Core_Staff_Administrators__DeleteMutationVariables,
} from '@/graphql/mutations/admin/members/staff/administrators/admin__core_staff_administrators__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Staff_Administrators__DeleteMutation,
      Admin__Core_Staff_Administrators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Administrators__Delete,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/admin', 'layout');
};
