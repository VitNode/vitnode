'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Themes__Admin__Upload,
  type Core_Themes__Admin__UploadMutation,
  type Core_Themes__Admin__UploadMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (formData: FormData) => {
  try {
    const files = formData.get('file') as File;

    const { data } = await fetcher<
      Core_Themes__Admin__UploadMutation,
      Core_Themes__Admin__UploadMutationVariables
    >({
      query: Core_Themes__Admin__Upload,
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

    revalidatePath('/admin/core/styles/themes', 'page');

    return { data };
  } catch (error) {
    return { error };
  }
};
