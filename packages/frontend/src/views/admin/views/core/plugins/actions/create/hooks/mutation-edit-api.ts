'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Edit,
  Admin__Core_Plugins__EditMutation,
  Admin__Core_Plugins__EditMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/admin__core_plugins__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationEditApi = async (
  variables: Admin__Core_Plugins__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__EditMutation,
      Admin__Core_Plugins__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
