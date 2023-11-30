import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { zodTextLanguageInputType } from '@/components/text-language-input';

export const useCreateEditFormForumAdmin = () => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: zodTextLanguageInputType.min(1, t('forms.empty')),
    description: zodTextLanguageInputType.min(1, t('forms.empty'))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: [],
      description: []
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return { form, onSubmit, isPending: false };
};
