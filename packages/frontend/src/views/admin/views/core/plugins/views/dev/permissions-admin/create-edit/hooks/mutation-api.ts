'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Permissions_Admin__Create_Edit,
  Admin__Core_Plugins__Permissions_Admin__Create_EditMutation,
  Admin__Core_Plugins__Permissions_Admin__Create_EditMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__create_edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Plugins__Permissions_Admin__Create_EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__Permissions_Admin__Create_EditMutation,
      Admin__Core_Plugins__Permissions_Admin__Create_EditMutationVariables
    >({
      query: Admin__Core_Plugins__Permissions_Admin__Create_Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
