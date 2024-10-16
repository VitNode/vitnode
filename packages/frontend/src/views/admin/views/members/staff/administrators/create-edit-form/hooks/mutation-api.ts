'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Staff_Administrators__Create_Edit,
  Admin__Core_Staff_Administrators__Create_EditMutation,
  Admin__Core_Staff_Administrators__Create_EditMutationVariables,
} from '@/graphql/mutations/admin/members/staff/administrators/admin__core_staff_administrators__create_edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__Create_EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Staff_Administrators__Create_EditMutation,
      Admin__Core_Staff_Administrators__Create_EditMutationVariables
    >({
      query: Admin__Core_Staff_Administrators__Create_Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
