'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '../../../../../../../graphql/fetcher';
import {
  Admin__Core_Plugins__Upload,
  Admin__Core_Plugins__UploadMutation,
  Admin__Core_Plugins__UploadMutationVariables,
} from '../../../../../../../graphql/graphql';

export const mutationApi = async (formData: FormData) => {
  try {
    const files = formData.get('file') as File;

    const { data } = await fetcher<
      Admin__Core_Plugins__UploadMutation,
      Omit<Admin__Core_Plugins__UploadMutationVariables, 'file'>
    >({
      query: Admin__Core_Plugins__Upload,
      variables: {
        code: formData.get('code') as string,
      },
      uploads: [
        {
          files,
          variable: 'file',
        },
      ],
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
