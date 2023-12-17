import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useSignInAdminView = () => {
  const t = useTranslations('core');
  // const mutation = useSignInAPI();

  const formSchema = z.object({
    email: z
      .string({
        required_error: t('forms.empty')
      })
      .min(1, {
        message: t('forms.empty')
      }),
    password: z
      .string({
        required_error: t('forms.empty')
      })
      .min(1, {
        message: t('forms.empty')
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //  await mutation.mutateAsync({ ...values, admin: true });
  };

  return {
    form,
    onSubmit
  };
};
