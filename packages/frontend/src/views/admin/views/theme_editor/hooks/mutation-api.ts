'use server';

import { fetcher, FetcherUploads } from '@/graphql/fetcher';
import {
  Admin__Core_Theme_Editor__Edit,
  Admin__Core_Theme_Editor__EditMutation,
  Admin__Core_Theme_Editor__EditMutationVariables,
} from '@/graphql/mutations/admin/theme_editor/admin__core_theme_editor__edit.generated';
import { ColorsEditAdminThemeEditor } from '@/graphql/types';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (formData: FormData) => {
  const formColors = formData.get('colors') as null | string;
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
  ['light', 'dark', 'mobile_light', 'mobile_dark'].forEach(el => {
    if (formData.get(`logos.${el}.file`)) {
      files.push({
        files: formData.get(`logos.${el}.file`) as File,
        variable: `logos.${el}.file`,
      });
    } else if (formData.get(`logos.${el}.keep`)) {
      logos[el] = { keep: true };
    }
  });

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
    return { error: e as string };
  }

  revalidatePath('/', 'layout');
};
