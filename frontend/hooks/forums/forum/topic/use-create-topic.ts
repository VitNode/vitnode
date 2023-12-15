import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { zodTextLanguageInputType } from '@/components/text-language-input';

export const useCreateTopic = () => {
  const t = useTranslations('core');

  const formSchema = z.object({
    title: zodTextLanguageInputType.min(1, t('forms.empty')),
    content: zodTextLanguageInputType.min(1, t('forms.empty'))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: [],
      content: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Add mutation
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return { form, onSubmit };
};
