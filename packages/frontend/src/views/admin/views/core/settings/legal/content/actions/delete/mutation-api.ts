'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Terms_Settings__Delete,
  Admin__Core_Terms_Settings__DeleteMutation,
  Admin__Core_Terms_Settings__DeleteMutationVariables,
} from '@/graphql/mutations/admin/settings/terms/admin__core_terms_settings__delete.generated';
import { revalidateTag } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Terms_Settings__DeleteMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Terms_Settings__DeleteMutation,
      Admin__Core_Terms_Settings__DeleteMutationVariables
    >({
      query: Admin__Core_Terms_Settings__Delete,
      variables,
    });

    revalidateTag('core_terms__show');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
