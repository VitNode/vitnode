'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Avatar__Upload,
  type Core_Members__Avatar__UploadMutation,
  type Core_Members__Avatar__UploadMutationVariables
} from '@/graphql/hooks';

export const mutationUploadApi = async (formData: FormData) => {
  try {
    const files = formData.get('file') as File;

    const { data } = await fetcher<
      Core_Members__Avatar__UploadMutation,
      Core_Members__Avatar__UploadMutationVariables
    >({
      query: Core_Members__Avatar__Upload,
      uploads: [
        {
          files,
          variable: 'file'
        }
      ],
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
