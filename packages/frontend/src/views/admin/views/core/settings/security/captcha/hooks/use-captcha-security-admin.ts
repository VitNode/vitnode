import { Admin__Core_Security__Captcha__ShowQuery } from '@/graphql/queries/admin/security/admin__core_security__captcha__show.generated';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useCaptchaSecurityAdmin = ({
  admin__core_security__captcha__show: data,
}: Admin__Core_Security__Captcha__ShowQuery) => {
  const t = useTranslations('core');
  const formSchema = z
    .object({
      type: z
        .enum([
          'none',
          'cloudflare_turnstile',
          'recaptcha_v3',
          'recaptcha_v2_invisible',
          'recaptcha_v2_checkbox',
        ])
        .default(data.type),
      secret_key: z.string().default(data.secret_key),
      site_key: z.string().default(data.site_key),
    })
    .refine(input => {
      if (input.type === 'none') {
        return true;
      }

      return input.secret_key !== '' && input.site_key !== '';
    });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const mutation = await mutationApi({
      type: values.type,
      secretKey: values.secret_key,
      siteKey: values.site_key,
    });

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
