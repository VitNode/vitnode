'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Upload,
  Admin__Core_Plugins__UploadMutation,
  Admin__Core_Plugins__UploadMutationVariables,
} from '@/graphql/mutations/admin/plugins/admin__core_plugins__upload.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (formData: FormData) => {
  const files = formData.get('file') as File;

  try {
    await fetcher<
      Admin__Core_Plugins__UploadMutation,
      Omit<Admin__Core_Plugins__UploadMutationVariables, 'file'>
    >({
      query: Admin__Core_Plugins__Upload,
      variables: {
        code: formData.get('code') as string,
      },
      files: [
        {
          files,
          variable: 'file',
        },
      ],
    });

    revalidatePath('/', 'layout');
  } catch (e) {
    if (typeof e === 'string') return { error: e };
  }
};
