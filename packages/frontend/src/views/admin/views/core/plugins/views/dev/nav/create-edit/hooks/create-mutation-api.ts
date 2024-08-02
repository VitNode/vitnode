'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Nav__Create,
  Admin__Core_Plugins__Nav__CreateMutation,
  Admin__Core_Plugins__Nav__CreateMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/nav/admin__core_plugins__nav__create.generated';

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
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/[locale]/admin/(auth)/(vitnode)', 'layout');
};
