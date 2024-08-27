'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Avatar__Upload,
  Core_Members__Avatar__UploadMutation,
  Core_Members__Avatar__UploadMutationVariables,
} from '@/graphql/mutations/settings/avatar/core_members__avatar__upload.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (formData: FormData) => {
  const files = formData.get('file') as File;

  try {
    await fetcher<
      Core_Members__Avatar__UploadMutation,
      Core_Members__Avatar__UploadMutationVariables
    >({
      query: Core_Members__Avatar__Upload,
      files: [
        {
          files,
          variable: 'file',
        },
      ],
    });
  } catch (e) {
    return { error: e as string };
  }

  revalidatePath('/', 'layout');
};
