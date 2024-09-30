import { useSignUp } from '@/views/theme/views/auth/sign/up/use-sign-up';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { useCaptcha } from '../../../use-captcha';
import { mutationApi } from './mutation-api';

export const nameRegex = /^(?!.* {2})[\p{L}\p{N}._@ -]*$/u;

export const useSignUpView = ({ installPage }: { installPage?: boolean }) => {
  const t = useTranslations('core.sign_up');
  const tCore = useTranslations('core.global');
  const { setEmailSuccess } = useSignUp();
  const { getTokenFromCaptcha, isReady } = useCaptcha();

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: tCore('errors.min_length', { length: 3 }),
      })
      .max(32, {
        message: tCore('errors.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: t('name.invalid'),
      })
      .default(''),
    email: z
      .string()
      .email({
        message: t('email_invalid'),
      })
      .default(''),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      )
      .default(''),
    terms: installPage
      ? z.boolean().optional()
      : z
          .boolean()
          .refine(value => value, {
            message: t('terms.empty'),
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
      toast.error(tCore('errors.title'), {
        description: tCore('errors.captcha_empty'),
      });

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, ...rest } = values;
    const mutation = await mutationApi({
      ...rest,
      token,
      installPage,
      newsletter: installPage ? true : values.newsletter,
    });

    if (mutation?.error) {
      if (mutation.error === 'CAPTCHA_FAILED') {
        toast.error(tCore('errors.title'), {
          description: tCore('errors.captcha_failed'),
        });

        return;
      }

      if (mutation.error === 'EMAIL_ALREADY_EXISTS') {
        form.setError(
          'email',
          {
            type: 'manual',
            message: t('email.already_exists'),
          },
          {
            shouldFocus: true,
          },
        );

        return;
      } else if (mutation.error === 'NAME_ALREADY_EXISTS') {
        form.setError(
          'name',
          {
            type: 'manual',
            message: t('name.already_exists'),
          },
          {
            shouldFocus: true,
          },
        );

        return;
      }

      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setEmailSuccess(values.email);
  };

  return {
    formSchema,
    onSubmit,
    isReady,
  };
};
