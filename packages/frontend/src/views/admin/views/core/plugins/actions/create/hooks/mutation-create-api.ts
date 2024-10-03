'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Create,
  Admin__Core_Plugins__CreateMutation,
  Admin__Core_Plugins__CreateMutationVariables,
} from '@/graphql/mutations/admin/plugins/admin__core_plugins__create.generated';
import { revalidatePath } from 'next/cache';

export const mutationCreateApi = async (
  variables: Admin__Core_Plugins__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__CreateMutation,
      Admin__Core_Plugins__CreateMutationVariables
    >({
      query: Admin__Core_Plugins__Create,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    if (e.message !== 'fetch failed') {
      return { error: e.message };
    }
  }

  revalidatePath('/', 'layout');
};
