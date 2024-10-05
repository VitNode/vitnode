'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Email_Settings__Edit,
  Admin__Core_Email_Settings__EditMutation,
  Admin__Core_Email_Settings__EditMutationVariables,
} from '@/graphql/mutations/admin/settings/email/admin__core_email_settings__edit.generated';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (formData: FormData) => {
  const variables: Admin__Core_Email_Settings__EditMutationVariables = {
    from: formData.get('from') as string,
    colorPrimary: formData.get('color_primary') as string,
    colorPrimaryForeground: formData.get('color_primary_foreground') as string,
    logo: {
      keep: formData.get('logo.keep') === 'true',
    },
  };

  const logo = formData.get('logo.file') as File;

  try {
    await fetcher<
      Admin__Core_Email_Settings__EditMutation,
      Admin__Core_Email_Settings__EditMutationVariables
    >({
      query: Admin__Core_Email_Settings__Edit,
      variables,
      files: [
        {
          variable: 'logo.file',
          files: logo,
        },
      ],
    });

    revalidatePath(
      '/[locale]/admin/(auth)/(vitnode)/core/settings/email',
      'page',
    );
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
