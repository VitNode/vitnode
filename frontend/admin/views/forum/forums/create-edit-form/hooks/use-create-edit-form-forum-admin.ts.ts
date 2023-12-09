import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import { useCreateForumAdminAPI } from './use-create-forum-admin-api';

export const useCreateEditFormForumAdmin = () => {
  const t = useTranslations('core');
  const { isPending, mutateAsync } = useCreateForumAdminAPI();

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
    await mutateAsync({
      name: values.name,
      description: values.description,
      isCategory: true
    });
  };

  return { form, onSubmit, isPending };
};
