import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

import { ErrorType } from '../../../../graphql/fetcher';

const nameRegex = /^(?!.* {2})[\p{L}\p{N}._@ -]*$/u;

export const useSignUpView = () => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: t('forms.empty'),
      })
      .max(32, {
        message: t('forms.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: t('sign_up.form.name.invalid'),
      }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: t('forms.empty'),
      }),
    password: z
      .string()
      .min(1, {
        message: t('forms.empty'),
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
        {
          message: t('sign_up.form.password.invalid'),
        },
      ),
    terms: z.boolean().refine(value => value, {
      message: t('sign_up.form.terms.empty'),
    }),
    newsletter: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
      newsletter: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, ...rest } = values;
    const mutation = await mutationApi(rest);

    if (mutation.error) {
      const error = mutation.error as ErrorType | undefined;

      if (error?.extensions) {
        const { code } = error.extensions;
        if (code === 'EMAIL_ALREADY_EXISTS') {
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

        if (code === 'NAME_ALREADY_EXISTS') {
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
      }
    }
  };

  return {
    form,
    onSubmit,
  };
};
