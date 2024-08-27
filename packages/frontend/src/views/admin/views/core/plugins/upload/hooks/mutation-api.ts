'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Upload,
  Admin__Core_Plugins__UploadMutation,
  Admin__Core_Plugins__UploadMutationVariables,
} from '@/graphql/mutations/admin/plugins/admin__core_plugins__upload.generated';

export const mutationApi = async (formData: FormData) => {
  const files = formData.get('file') as File;

  try {
    const data = await fetcher<
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

    return { data };
  } catch (e) {
    return { error: e as string };
  }
};
