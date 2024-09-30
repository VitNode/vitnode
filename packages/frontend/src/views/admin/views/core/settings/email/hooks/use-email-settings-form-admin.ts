import { Admin__Core_Email_Settings__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { EmailProvider } from '@/graphql/types';
import { getHSLFromString, isColorBrightness } from '@/helpers/colors';
import { zodFile } from '@/helpers/zod';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useEmailSettingsFormAdmin = ({
  admin__core_email_settings__show: data,
}: Admin__Core_Email_Settings__ShowQuery) => {
  const t = useTranslations('core.global');
  const formSchema = z.object({
    color_primary: z.string().default(data.color_primary),
    logo: zodFile.optional(),
    provider: z.nativeEnum(EmailProvider).default(data.provider),
    smtp: z.object({
      host: z
        .string()
        .default(data.smtp_host ?? '')
        .optional(),
      user: z
        .string()
        .default(data.smtp_user ?? '')
        .optional(),
      password: z.string().default('').optional(),
      secure: z
        .boolean()
        .default(data.smtp_secure ?? false)
        .optional(),
      port: z.coerce
        .number()
        .min(1)
        .max(999)
        .default(data.smtp_port ?? 587)
        .optional(),
    }),
    resend_key: z.string().default('').optional(),
    from: z.string().default(data.from),
  });
  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const primaryHSL = getHSLFromString(values.color_primary);
    if (!primaryHSL) return;

    const formData = new FormData();
    formData.append('provider', values.provider);
    formData.append('from', values.from);
    formData.append('color_primary', values.color_primary);
    formData.append(
      'color_primary_foreground',
      `hsl(${isColorBrightness(primaryHSL) ? `${primaryHSL.h}, 40%, 2%` : `${primaryHSL.h}, 40%, 98%`})`,
    );
    if (values.provider === 'smtp') {
      formData.append('smtp_host', values.smtp.host ?? '');
      formData.append('smtp_user', values.smtp.user ?? '');
      formData.append('smtp_port', values.smtp.port?.toString() ?? '');
      if (values.smtp.password) {
        formData.append('smtp_password', values.smtp.password);
      }
      formData.append('smtp_secure', values.smtp.secure?.toString() ?? '');
    } else if (values.provider === 'resend' && values.resend_key) {
      formData.append('resend_key', values.resend_key);
    }

    if (values.logo) {
      if (values.logo instanceof File) {
        formData.append('logo.file', values.logo);
      } else {
        formData.append('logo.keep', 'true');
      }
    }

    const mutation = await mutationApi(formData);
    if (mutation?.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
    form.reset(values);
  };

  return { onSubmit, formSchema };
};
