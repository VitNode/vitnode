'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Core_Members__Avatar__Upload,
  Core_Members__Avatar__UploadMutation,
  Core_Members__Avatar__UploadMutationVariables,
} from '@/graphql/mutations/settings/avatar/core_members__avatar__upload.generated';

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
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
