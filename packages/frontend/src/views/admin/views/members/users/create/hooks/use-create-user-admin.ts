import { nameRegex } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

export const useCreateUserAdmin = () => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: t('forms.min_length', { length: 3 }),
      })
      .max(32, {
        message: t('forms.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: t('sign_up.form.name.invalid'),
      })
      .default(''),
    email: z
      .string()
      .email({
        message: t('forms.email_invalid'),
      })
      .default(''),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      )
      .default(''),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return { formSchema, onSubmit };
};
