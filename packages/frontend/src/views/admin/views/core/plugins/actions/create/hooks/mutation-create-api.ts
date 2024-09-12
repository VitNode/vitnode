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

    // Revalidate after 3 seconds in promise. Wait for fast refresh to compilation files.
    await new Promise<void>(resolve =>
      setTimeout(() => {
        revalidatePath('/', 'layout');
        resolve();
      }, 3000),
    );
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
