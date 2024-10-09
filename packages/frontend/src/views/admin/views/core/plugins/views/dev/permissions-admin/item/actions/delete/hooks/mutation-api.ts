'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Permissions_Admin__Delete,
  Admin__Core_Plugins__Permissions_Admin__DeleteMutation,
  Admin__Core_Plugins__Permissions_Admin__DeleteMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__delete.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Plugins__Permissions_Admin__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__Permissions_Admin__DeleteMutation,
      Admin__Core_Plugins__Permissions_Admin__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Permissions_Admin__Delete,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
