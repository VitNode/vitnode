import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useSignInAPI } from './use-sign-in-api';

export const useSignInView = () => {
  const t = useTranslations('core');
  const mutation = useSignInAPI();

  const formSchema = z.object({
    email: z.string().nonempty({
      message: t('forms.empty')
    }),
    password: z.string().nonempty({
      message: t('forms.empty')
    }),
    remember: z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync({ ...values });
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    error: mutation.error
  };
};
