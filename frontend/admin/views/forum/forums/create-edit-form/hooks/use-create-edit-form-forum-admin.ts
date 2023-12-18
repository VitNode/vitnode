import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';
import { mutationCreateApi } from './mutation-create-api';
import { APIKeys } from '@/graphql/api-keys';

export const useCreateEditFormForumAdmin = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  const { setOpen } = useDialog();
  const queryClient = useQueryClient();

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
    })
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
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationCreateApi({
      name: values.name,
      description: values.description,
      permissions: values.permissions
    });

    if (mutation.error) {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });

      return;
    }

    queryClient.refetchQueries({
      queryKey: [APIKeys.FORUMS_ADMIN]
    });

    setOpen(false);
  };

  return { form, onSubmit };
};
