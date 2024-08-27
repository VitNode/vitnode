'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Languages__Download,
  Admin__Core_Languages__DownloadMutation,
  Admin__Core_Languages__DownloadMutationVariables,
} from '@/graphql/mutations/admin/languages/admin__core_languages__download.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (
  variables: Admin__Core_Languages__DownloadMutationVariables,
) => {
  try {
    const data = await fetcher<
      Admin__Core_Languages__DownloadMutation,
      Admin__Core_Languages__DownloadMutationVariables
    >({
      query: Admin__Core_Languages__Download,
      variables,
    });

    revalidatePath('/admin/core/langs', 'page');

    return { data };
  } catch (e) {
    return { error: e as string };
  }
};
