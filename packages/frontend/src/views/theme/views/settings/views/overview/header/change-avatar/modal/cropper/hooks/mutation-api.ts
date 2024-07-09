'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Members__Avatar__Upload,
  Core_Members__Avatar__UploadMutation,
  Core_Members__Avatar__UploadMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const mutationApi = async (formData: FormData) => {
  const files = formData.get('file') as File;

  await fetcher<
    Core_Members__Avatar__UploadMutation,
    Core_Members__Avatar__UploadMutationVariables
  >({
    query: Core_Members__Avatar__Upload,
    uploads: [
      {
        files,
        variable: 'file',
      },
    ],
  });

  revalidatePath('/', 'layout');
};
