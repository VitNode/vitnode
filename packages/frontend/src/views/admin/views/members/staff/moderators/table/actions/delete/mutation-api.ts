'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Staff_Moderators__Delete,
  Admin__Core_Staff_Moderators__DeleteMutation,
  Admin__Core_Staff_Moderators__DeleteMutationVariables,
} from '@/graphql/mutations/admin/members/staff/moderators/admin__core_staff_moderators__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Staff_Moderators__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Staff_Moderators__DeleteMutation,
      Admin__Core_Staff_Moderators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Moderators__Delete,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/', 'layout');
};
