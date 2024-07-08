import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { mutationApi } from './mutation-api';

import {
  Admin__Core_Security__Captcha__ShowQuery,
  CaptchaTypeEnum,
} from '@/graphql/graphql';

export const useCaptchaSecurityAdmin = ({
  admin__core_security__captcha__show: data,
}: Admin__Core_Security__Captcha__ShowQuery) => {
  const t = useTranslations('core');
  const formSchema = z.object({
    type: z.nativeEnum(CaptchaTypeEnum),
    secret_key: z.string(),
    site_key: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: data.type,
      secret_key: data.secret_key,
      site_key: data.site_key,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      type: 'none',
      secretKey: values.secret_key,
      siteKey: values.site_key,
    });

    if (mutation.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
    form.reset(values);
  };

  return { form, onSubmit };
};
