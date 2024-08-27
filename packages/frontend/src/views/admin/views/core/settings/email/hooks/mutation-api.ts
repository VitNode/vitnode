'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Email_Settings__Edit,
  Admin__Core_Email_Settings__EditMutation,
  Admin__Core_Email_Settings__EditMutationVariables,
} from '@/graphql/mutations/admin/settings/email/admin__core_email_settings__edit.generated';
import { EmailProvider } from '@/graphql/types';
import { revalidatePath } from 'next/cache';

export const mutationApi = async (formData: FormData) => {
  const provider = formData.get('provider') as EmailProvider;
  const variables: Admin__Core_Email_Settings__EditMutationVariables = {
    provider,
    colorPrimary: formData.get('color_primary') as string,
    colorPrimaryForeground: formData.get('color_primary_foreground') as string,
    smtp:
      provider === EmailProvider.smtp
        ? {
            host: formData.get('smtp_host') as string,
            user: formData.get('smtp_user') as string,
            port: Number(formData.get('smtp_port')),
            secure: Boolean(formData.get('smtp_secure')),
            password: formData.get('smtp_password') as string,
          }
        : undefined,
    resendKey:
      provider === EmailProvider.resend
        ? (formData.get('resend_key') as string)
        : undefined,
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
  } catch (e) {
    return { error: e as string };
  }

  revalidatePath('/admin/core/settings/email', 'page');
};
