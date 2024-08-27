'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Update,
  Admin__Core_Languages__UpdateMutation,
  Admin__Core_Languages__UpdateMutationVariables,
} from '@/graphql/mutations/admin/languages/admin__core_languages__update.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (formData: FormData) => {
  const files = formData.get('file') as File;
  const code = formData.get('code') as string;

  try {
    await fetcher<
      Admin__Core_Languages__UpdateMutation,
      Omit<Admin__Core_Languages__UpdateMutationVariables, 'file'>
    >({
      query: Admin__Core_Languages__Update,
      files: [
        {
          files,
          variable: 'file',
        },
      ],
      variables: {
        code,
      },
    });
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }

  revalidatePath('/', 'layout');
};
