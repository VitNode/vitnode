import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { getCurrentDate } from '@/functions/date';

export const useSignUpView = () => {
  const t = useTranslations('core');

  // Check if birthday is valid 13 years old
  const oneDayUNIX = 86400;
  const thirteenYearsInUNIX = oneDayUNIX * 365 * 13;
  const currentDate = getCurrentDate();

  const formSchema = z
    .object({
      nickname: z.string().nonempty({
        message: t('forms.empty')
      }),
      email: z.string().nonempty({
        message: t('forms.empty')
      }),
      birthday: z
        .string()
        .transform(value => Math.floor(new Date(value).getTime() / 1000))
        .refine(value => currentDate - value >= thirteenYearsInUNIX, {
          message: t('sign-up.form.birthday.too_young', { years: 13 })
        }),
      password: z.string().nonempty({
        message: t('forms.empty')
      }),
      password_confirmation: z.string().nonempty({
        message: t('forms.empty')
      }),
      terms: z.boolean().refine(value => value, {
        message: t('sign-up.form.terms.empty')
      }),
      newsletter: z.boolean()
    })
    .refine(data => data.password === data.password_confirmation, {
      message: t('sign-up.form.password_confirmation.not_match'),
      path: ['password_confirmation']
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      password_confirmation: '',
      birthday: currentDate,
      terms: false
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return {
    form,
    onSubmit
  };
};
