'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Delete,
  Admin__Core_Plugins__DeleteMutation,
  Admin__Core_Plugins__DeleteMutationVariables,
} from '@/graphql/mutations/admin/plugins/admin__core_plugins__delete.generated';
import { revalidatePath, revalidateTag } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Plugins__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__DeleteMutation,
      Admin__Core_Plugins__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Delete,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    if (e.message !== 'fetch failed') {
      return { error: e.message };
    }
  }

  revalidatePath('/', 'layout');
  revalidateTag('Admin__Core_Plugins__Show');
};
