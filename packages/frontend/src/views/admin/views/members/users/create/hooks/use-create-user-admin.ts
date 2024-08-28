import { useDialog } from '@/components/ui/dialog';
import { nameRegex } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useCreateUserAdmin = () => {
  const t = useTranslations('admin.members.users.create');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: tCore('forms.min_length', { length: 3 }),
      })
      .max(32, {
        message: tCore('forms.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: tCore('sign_up.form.name.invalid'),
      })
      .default(''),
    email: z
      .string()
      .email({
        message: tCore('forms.email_invalid'),
      })
      .default(''),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
      )
      .default(''),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const mutation = await mutationApi(values);
    if (mutation?.error) {
      if (mutation.error === 'EMAIL_ALREADY_EXISTS') {
        form.setError(
          'email',
          {
            type: 'manual',
            message: tCore('sign_up.form.email.already_exists'),
          },
          {
            shouldFocus: true,
          },
        );
      } else if (mutation.error === 'NAME_ALREADY_EXISTS') {
        form.setError(
          'name',
          {
            type: 'manual',
            message: tCore('sign_up.form.name.already_exists'),
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

    setOpen?.(false);
    toast.success(t('success'), {
      description: values.name,
    });
  };

  return { formSchema, onSubmit };
};
