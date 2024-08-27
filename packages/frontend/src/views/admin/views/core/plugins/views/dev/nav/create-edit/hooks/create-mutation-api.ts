'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Nav__Create,
  Admin__Core_Plugins__Nav__CreateMutation,
  Admin__Core_Plugins__Nav__CreateMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/nav/admin__core_plugins__nav__create.generated';
import { revalidatePath } from 'next/cache';

export const createMutationApi = async (
  variables: Admin__Core_Plugins__Nav__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Plugins__Nav__CreateMutation,
      Admin__Core_Plugins__Nav__CreateMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Create,
      variables,
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/[locale]/admin/(auth)/(vitnode)', 'layout');
};
