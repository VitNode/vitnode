import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import { mutationApi } from './mutation-api';
import { useToast } from '@/components/ui/use-toast';

export const useCreateTopic = () => {
  const t = useTranslations('core');
  const { toast } = useToast();

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
    try {
      await mutationApi({ ...values, forumId: '1' });
      // TODO: Add redirect to the topic page
    } catch (err) {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });

      return;
    }
  };

  return { form, onSubmit };
};
