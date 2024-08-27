'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Create,
  Admin__Core_Languages__CreateMutation,
  Admin__Core_Languages__CreateMutationVariables,
} from '@/graphql/mutations/admin/languages/admin__core_languages__create.generated';
import { revalidatePath } from 'next/cache';

export const createMutationApi = async (
  variables: Admin__Core_Languages__CreateMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Languages__CreateMutation,
      Admin__Core_Languages__CreateMutationVariables
    >({
      query: Admin__Core_Languages__Create,
      variables,
    });
  } catch (e) {
    return { error: e as string };
  }

  revalidatePath('/', 'layout');
};
