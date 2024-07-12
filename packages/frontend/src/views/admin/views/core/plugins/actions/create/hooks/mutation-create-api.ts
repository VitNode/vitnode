'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Create,
  Admin__Core_Plugins__CreateMutation,
  Admin__Core_Plugins__CreateMutationVariables,
} from '@/graphql/graphql';
import { CONFIG } from '@/helpers/config-with-env';

export const mutationCreateApi = async (
  variables: Admin__Core_Plugins__CreateMutationVariables,
) => {
  await fetcher<
    Admin__Core_Plugins__CreateMutation,
    Admin__Core_Plugins__CreateMutationVariables
  >({
    query: Admin__Core_Plugins__Create,
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
  }
};
