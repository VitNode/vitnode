import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import { useCreateForumAdminAPI } from './use-create-forum-admin-api';
import { convertTextToTextSEO } from '@/functions/seo';

export const useCreateEditFormForumAdmin = () => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: zodTextLanguageInputType.min(1, t('forms.empty')),
    description: zodTextLanguageInputType,
    permissions: z.object({
      can_all_view: z.boolean(),
      can_all_read: z.boolean(),
      can_all_create: z.boolean(),
      can_all_reply: z.boolean(),
      groups: z.array(
        z.object({
          id: z.string(),
          view: z.boolean(),
          read: z.boolean(),
          create: z.boolean(),
          reply: z.boolean()
        })
      )
    }),
    name_seo: z.string().optional()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: [],
      description: [],
      permissions: {
        can_all_view: false,
        can_all_read: false,
        can_all_create: false,
        can_all_reply: false,
        groups: []
      },
      name_seo: ''
    },
    mode: 'onChange'
  });
  const { isPending, mutateAsync } = useCreateForumAdminAPI({ setError: form.setError });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutateAsync({
      name: values.name,
      description: values.description,
      permissions: values.permissions,
      nameSeo: convertTextToTextSEO(values.name_seo)
    });
  };

  return { form, onSubmit, isPending };
};
