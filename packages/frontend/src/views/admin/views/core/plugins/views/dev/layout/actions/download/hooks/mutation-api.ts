'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Download,
  Admin__Core_Plugins__DownloadMutation,
  Admin__Core_Plugins__DownloadMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Plugins__DownloadMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__DownloadMutation,
      Admin__Core_Plugins__DownloadMutationVariables
    >({
      query: Admin__Core_Plugins__Download,
      variables,
    });

    if (variables.version && variables.versionCode) {
      revalidatePath(`/admin/core/plugins/${variables.code}/dev`, 'layout');
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
