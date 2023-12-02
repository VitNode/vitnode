import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { convertDateToUnixTime, currentDate } from '@/functions/date';
import { useSignUpAPI } from './use-sign-up-api';
import { ErrorType } from '@/graphql/fetcher';

export const useSignUpView = () => {
  const t = useTranslations('core');
  const { mutateAsync, ...api } = useSignUpAPI();

  // Check if birthday is valid 13 years old
  const oneDayUNIX = 86400;
  const thirteenYearsInUNIX = oneDayUNIX * 365 * 13;

  const formSchema = z
    .object({
      name: z
        .string({
          required_error: t('forms.empty')
        })
        .min(1, {
          message: t('forms.empty')
        }),
      email: z
        .string({
          required_error: t('forms.empty')
        })
        .min(1, {
          message: t('forms.empty')
        }),
      birthday: z
        .string()
        .refine(
          value =>
            currentDate() - Math.floor(new Date(value).getTime() / 1000) >= thirteenYearsInUNIX,
          {
            message: t('sign_up.form.birthday.too_young', { years: 13 })
          }
        ),
      password: z
        .string({
          required_error: t('forms.empty')
        })
        .min(1, {
          message: t('forms.empty')
        }),
      password_confirmation: z
        .string({
          required_error: t('forms.empty')
        })
        .min(1, {
          message: t('forms.empty')
        }),
      terms: z.boolean().refine(value => value, {
        message: t('sign_up.form.terms.empty')
      }),
      newsletter: z.boolean()
    })
    .refine(data => data.password === data.password_confirmation, {
      message: t('sign_up.form.password_confirmation.not_match'),
      path: ['password_confirmation']
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      birthday: new Date().toDateString(),
      terms: false,
      newsletter: false
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_confirmation, terms, ...rest } = values;

    try {
      await mutateAsync({
        ...rest,
        birthday: convertDateToUnixTime(values.birthday)
      });
    } catch (error) {
      const {
        extensions: { code }
      } = error as ErrorType;

      if (code === 'EMAIL_ALREADY_EXISTS') {
        form.setError(
          'email',
          {
            type: 'manual',
            message: t('sign_up.form.email.already_exists')
          },
          {
            shouldFocus: true
          }
        );

        return;
      }

      if (code === 'NAME_ALREADY_EXISTS') {
        form.setError(
          'name',
          {
            type: 'manual',
            message: t('sign_up.form.name.already_exists')
          },
          {
            shouldFocus: true
          }
        );

        return;
      }
    }
  };

  return {
    form,
    onSubmit,
    ...api
  };
};
