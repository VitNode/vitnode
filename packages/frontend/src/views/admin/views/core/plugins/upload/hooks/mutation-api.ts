'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Upload,
  Admin__Core_Plugins__UploadMutation,
  Admin__Core_Plugins__UploadMutationVariables,
} from '@/graphql/graphql';
import { CONFIG } from '@/helpers/config-with-env';

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

    if (CONFIG.node_development) {
      // Revalidate after 3 seconds in promise. Wait for fast refresh to compilation files.
      await new Promise<void>(resolve =>
        setTimeout(() => {
          revalidatePath('/', 'layout');
          resolve();
        }, 3000),
      );
    } else {
      revalidatePath('/', 'layout');
    }

    return { data };
  } catch (e) {
    return { error: e as FetcherErrorType };
  }
};
