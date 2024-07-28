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
    : undefined;
  const logos: Admin__Core_Theme_Editor__EditMutationVariables['logos'] = {
    width: Number(formData.get('logos.width')),
    mobile_width: Number(formData.get('logos.mobile_width')),
    text: formData.get('logos.text') as string,
  };

  // Files
  const files: FetcherUploads[] = [];
  if (formData.get('logos.light.file')) {
    files.push({
      files: formData.get('logos.light.file') as File,
      variable: 'logos.light.file',
    });
  } else if (formData.get('logos.light.keep')) {
    logos.light = { keep: true };
  }
  if (formData.get('logos.dark.file')) {
    files.push({
      files: formData.get('logos.dark.file') as File,
      variable: 'logos.dark.file',
    });
  } else if (formData.get('logos.dark.keep')) {
    logos.dark = { keep: true };
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
