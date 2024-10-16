'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Manifest_Metadata__Edit,
  Admin__Core_Manifest_Metadata__EditMutation,
  Admin__Core_Manifest_Metadata__EditMutationVariables,
} from '@/graphql/mutations/admin/settings/admin__core_manifest_metadata__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Manifest_Metadata__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Manifest_Metadata__EditMutation,
      Admin__Core_Manifest_Metadata__EditMutationVariables
    >({
      query: Admin__Core_Manifest_Metadata__Edit,
      variables,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
