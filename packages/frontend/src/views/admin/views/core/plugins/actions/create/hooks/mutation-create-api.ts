'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import { CONFIG } from '@/helpers/config-with-env';
import {
  Admin__Core_Plugins__Create,
  Admin__Core_Plugins__CreateMutation,
  Admin__Core_Plugins__CreateMutationVariables,
} from '@/graphql/mutations/admin/plugins/admin__core_plugins__create.generated';

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
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  if (CONFIG.node_development) {
    // Revalidate after 3 seconds in promise. Wait for fast refresh to compilation files.
    await new Promise<void>(resolve =>
      setTimeout(() => {
        revalidatePath('/', 'layout');
        resolve();
      }, 3000),
    );
  }
};
