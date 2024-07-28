'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType, FetcherUploads } from '@/graphql/fetcher';
import {
  Admin__Core_Theme_Editor__Edit,
  Admin__Core_Theme_Editor__EditMutation,
  Admin__Core_Theme_Editor__EditMutationVariables,
  ColorsEditAdminThemeEditor,
} from '@/graphql/graphql';

export const mutationApi = async (formData: FormData) => {
  const formColors = formData.get('colors') as string | null;
  const colors = formColors
    ? (JSON.parse(formColors) as ColorsEditAdminThemeEditor)
    : null;
  const logos = {
    width: Number(formData.get('logos.width')),
    mobile_width: Number(formData.get('logos.mobile_width')),
    text: formData.get('logos.text') as string,
  };

  // Files
  const files: FetcherUploads[] = [];
  if (formData.get('logos.light')) {
    files.push({
      files: formData.get('logos.light') as File,
      variable: 'logos.light',
    });
  }
  if (formData.get('logos.dark')) {
    files.push({
      files: formData.get('logos.dark') as File,
      variable: 'logos.dark',
    });
  }

  try {
    await fetcher<
      Admin__Core_Theme_Editor__EditMutation,
      Admin__Core_Theme_Editor__EditMutationVariables
    >({
      query: Admin__Core_Theme_Editor__Edit,
      variables: {
        colors,
        logos,
      },
      files,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/', 'layout');
};
