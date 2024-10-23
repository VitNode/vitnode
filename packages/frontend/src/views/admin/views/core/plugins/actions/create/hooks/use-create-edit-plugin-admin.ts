import { ShowAdminPlugins } from '@/graphql/types';
import { useSessionAdmin } from '@/hooks/use-session-admin';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationCreateApi } from './mutation-create-api';
import { mutationEditApi } from './mutation-edit-api';

export const codePluginRegex = /^[a-z0-9-]*$/;

interface Args {
  data?: ShowAdminPlugins;
}

export const useCreateEditPluginAdmin = ({ data }: Args) => {
  const t = useTranslations('admin.core.plugins');
  const tCore = useTranslations('core.global.errors');
  const { session } = useSessionAdmin();

  const formSchema = z.object({
    name: z
      .string()
      .min(3)
      .max(50)
      .default(data?.name ?? ''),
    description: z
      .string()
      .default(data?.description ?? '')
      .optional(),
    code: z
      .string()
      .min(3)
      .max(50)
      .refine(value => codePluginRegex.test(value), {
        message: t('create.code.invalid'),
      })
      .default(data?.code ?? ''),
    support_url: z
      .string()
      .url()
      .default(data?.support_url ?? ''),
    author: z
      .string()
      .min(3)
      .max(100)
      .default(data ? data.author : (session?.name ?? '')),
    author_url: z
      .string()
      .url()
      .or(z.literal(''))
      .default(data?.author_url ?? '')
      .optional(),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    let error = '';

    if (data) {
      const mutation = await mutationEditApi({
        name: values.name,
        code: values.code,
        description: values.description,
        supportUrl: values.support_url,
        author: values.author,
        authorUrl: values.author_url,
        default: data.default,
      });

      if (mutation?.error) {
        error = mutation.error;
      }
    } else {
      const mutation = await mutationCreateApi({
        name: values.name,
        code: values.code,
        description: values.description,
        supportUrl: values.support_url,
        author: values.author,
        authorUrl: values.author_url,
      });

      if (mutation?.error) {
        error = mutation.error;
      }
    }

    if (error) {
      if (error === 'PLUGIN_ALREADY_EXISTS') {
        form.setError('code', {
          message: t('create.code.exists'),
        });

        return;
      }

      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    toast.success(t('edit.success'), {
      description: values.name,
    });
  };

  return {
    formSchema,
    onSubmit,
  };
};
