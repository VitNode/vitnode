import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import { mutationApi } from './mutation-api';
import { getIdFormString } from '@/functions/url';

export const useCreatePost = () => {
  const t = useTranslations('core');
  const { id } = useParams();

  const formSchema = z.object({
    content: zodTextLanguageInputType.min(1, t('forms.empty'))
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      content: values.content,
      topicId: getIdFormString(id)
    });

    if (mutation.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error')
      });

      return;
    }
  };

  return {
    form,
    onSubmit
  };
};
