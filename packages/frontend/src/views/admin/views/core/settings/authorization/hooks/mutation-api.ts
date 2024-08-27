'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Authorization_Settings__Edit,
  Admin__Core_Authorization_Settings__EditMutation,
  Admin__Core_Authorization_Settings__EditMutationVariables,
} from '@/graphql/mutations/admin/settings/authorization/admin__core_authorization_settings__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Authorization_Settings__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Authorization_Settings__EditMutation,
      Admin__Core_Authorization_Settings__EditMutationVariables
    >({
      query: Admin__Core_Authorization_Settings__Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (e) {
    return { error: e as string };
  }
};
