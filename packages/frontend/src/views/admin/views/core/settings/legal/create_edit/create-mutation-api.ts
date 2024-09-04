'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Terms_Settings__Create,
  Admin__Core_Terms_Settings__CreateMutation,
  Admin__Core_Terms_Settings__CreateMutationVariables,
} from '@/graphql/mutations/admin/settings/terms/admin__core_terms_settings__create.generated';
import { revalidateTag } from 'next/cache';

export const createMutationApi = async (
  variables: Admin__Core_Terms_Settings__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Terms_Settings__CreateMutation,
      Admin__Core_Terms_Settings__CreateMutationVariables
    >({
      query: Admin__Core_Terms_Settings__Create,
      variables,
    });

    revalidateTag('core_terms__show');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
