'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Download,
  Admin__Core_Languages__DownloadMutation,
  Admin__Core_Languages__DownloadMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Languages__DownloadMutationVariables,
) => {
  const data = await fetcher<
    Admin__Core_Languages__DownloadMutation,
    Admin__Core_Languages__DownloadMutationVariables
  >({
    query: Admin__Core_Languages__Download,
    variables,
  });

  revalidatePath('/admin/core/langs', 'page');

  return data;
};
