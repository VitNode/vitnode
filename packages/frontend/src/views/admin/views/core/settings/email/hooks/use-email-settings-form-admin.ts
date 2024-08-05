import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { mutationApi } from './mutation-api';
import { Admin__Core_Email_Settings__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { getHSLFromString, isColorBrightness } from '@/helpers/colors';
import { EmailProvider } from '@/graphql/types';
import { zodFile } from '@/helpers/zod';

export const useEmailSettingsFormAdmin = ({
  admin__core_email_settings__show: data,
}: Admin__Core_Email_Settings__ShowQuery) => {
  const t = useTranslations('core');

  const formSchema = z
    .object({
      color_primary: z.string().default(data.color_primary),
      logo: zodFile.nullable(),
      provider: z.nativeEnum(EmailProvider),
      smtp: z.object({
        host: z.string(),
        user: z.string(),
        port: z.number().int().min(1).max(999),
        secure: z.boolean(),
        password: z.string(),
      }),
      resend_key: z.string(),
    })
    .refine(input => {
      if (input.provider === 'smtp') {
        return input.smtp.host !== '' && input.smtp.user !== '';
      }

      return true;
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: data.logo,
      provider: data.provider,
      smtp: {
        host: data.smtp_host || '',
        user: data.smtp_user || '',
        port: data.smtp_port || 1,
        secure: data.smtp_secure || false,
        password: '', // Password is not fetched from the server,
      },
      resend_key: '', // Resend key is not fetched from the server,
      color_primary: data.color_primary || 'hsl(0, 0, 0)',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const primaryHSL = getHSLFromString(values.color_primary);
    if (!primaryHSL) return;

    const formData = new FormData();
    formData.append('provider', values.provider);
    formData.append('color_primary', values.color_primary);
    formData.append(
      'color_primary_foreground',
      `hsl(${isColorBrightness(primaryHSL) ? `${primaryHSL.h}, 40%, 2%` : `${primaryHSL.h}, 40%, 98%`})`,
    );
    if (values.provider === 'smtp') {
      formData.append('smtp_host', values.smtp.host);
      formData.append('smtp_user', values.smtp.user);
      formData.append('smtp_port', values.smtp.port.toString());
      formData.append('smtp_password', values.smtp.password);
      formData.append('smtp_secure', values.smtp.secure.toString());
    } else if (values.provider === 'resend') {
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

  return { form, onSubmit, formSchema };
};
