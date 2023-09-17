import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useSignInView = () => {
  const t = useTranslations('core');

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
      password: ''
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
