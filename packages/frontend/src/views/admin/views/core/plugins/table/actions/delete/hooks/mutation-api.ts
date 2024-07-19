'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Plugins__Delete,
  Admin__Core_Plugins__DeleteMutation,
  Admin__Core_Plugins__DeleteMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';
import { CONFIG } from '@/helpers/config-with-env';

export const mutationApi = async (
  variables: Admin__Core_Plugins__DeleteMutationVariables,
) => {
  await fetcher<
    Admin__Core_Plugins__DeleteMutation,
    Admin__Core_Plugins__DeleteMutationVariables
  >({
    query: Admin__Core_Plugins__Delete,
    variables,
  });

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
