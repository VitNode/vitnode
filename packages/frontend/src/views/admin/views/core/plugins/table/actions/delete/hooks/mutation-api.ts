'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import { CONFIG } from '@/helpers/config-with-env';
import {
  Admin__Core_Plugins__Delete,
  Admin__Core_Plugins__DeleteMutation,
  Admin__Core_Plugins__DeleteMutationVariables,
} from '@/graphql/mutations/admin/plugins/admin__core_plugins__delete.generated';

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
  } else {
    revalidatePath('/', 'layout');
  }
};
