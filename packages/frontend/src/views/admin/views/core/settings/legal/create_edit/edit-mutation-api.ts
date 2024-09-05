'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Terms_Settings__Edit,
  Admin__Core_Terms_Settings__EditMutation,
  Admin__Core_Terms_Settings__EditMutationVariables,
} from '@/graphql/mutations/admin/settings/terms/admin__core_terms_settings__edit.generated';

import { revalidateApi } from '../revalidate-api';

export const editMutationApi = async (
  variables: {
    prevCode: string;
  } & Admin__Core_Terms_Settings__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Terms_Settings__EditMutation,
      Admin__Core_Terms_Settings__EditMutationVariables
    >({
      query: Admin__Core_Terms_Settings__Edit,
      variables,
    });

    revalidateApi(variables.code, variables.prevCode);
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
