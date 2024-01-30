'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Themes__Admin__Download,
  type Core_Themes__Admin__DownloadMutation,
  type Core_Themes__Admin__DownloadMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Themes__Admin__DownloadMutationVariables) => {
  try {
    const { data } = await fetcher<
      Core_Themes__Admin__DownloadMutation,
      Core_Themes__Admin__DownloadMutationVariables
    >({
      query: Core_Themes__Admin__Download,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    if (variables.version && variables.versionCode) {
      revalidatePath('/admin/core/styles/themes', 'page');
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
