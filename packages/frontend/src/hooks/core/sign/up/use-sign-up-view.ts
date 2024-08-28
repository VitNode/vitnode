import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { useCaptcha } from '../../../use-captcha';
import { mutationApi } from './mutation-api';

export const nameRegex = /^(?!.* {2})[\p{L}\p{N}._@ -]*$/u;

export const useSignUpView = () => {
  const t = useTranslations('core');
  const [successName, setSuccessName] = React.useState('');
  const { getTokenFromCaptcha, isReady } = useCaptcha();

  const formSchema = z.object({
    name: z
      .string()
      .min(3)
      .max(32, {
        message: t('forms.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: t('sign_up.form.name.invalid'),
      })
      .default(''),
    email: z.string().email().default(''),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      )
      .default(''),
    terms: z
      .boolean()
      .refine(value => value, {
        message: t('sign_up.form.terms.empty'),
      })
      .default(false),
    newsletter: z.boolean().default(false).optional(),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const token = await getTokenFromCaptcha();
    if (!token) {
      toast.error(t('errors.title'), {
        description: t('errors.captcha_empty'),
      });

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, ...rest } = values;
    const mutation = await mutationApi({ ...rest, token });

    if (mutation?.error) {
      if (mutation.error === 'CAPTCHA_FAILED') {
        toast.error(t('errors.title'), {
          description: t('errors.captcha_failed'),
        });

        return;
      }

      if (mutation.error === 'EMAIL_ALREADY_EXISTS') {
        form.setError(
          'email',
          {
            type: 'manual',
            message: t('sign_up.form.email.already_exists'),
          },
          {
            shouldFocus: true,
          },
        );

        return;
      }

      if (mutation.error === 'NAME_ALREADY_EXISTS') {
        form.setError(
          'name',
          {
            type: 'manual',
            message: t('sign_up.form.name.already_exists'),
          },
          {
            shouldFocus: true,
          },
        );

        return;
      }

      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    setSuccessName(values.name);
  };

  return {
    formSchema,
    onSubmit,
    isReady,
    successName,
  };
};
