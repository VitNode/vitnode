import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { createMutationApi } from './create-mutation-api';
import { editMutationApi } from './edit-mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { FetcherErrorType } from '@/graphql/fetcher';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';

export const useCreateNavPluginAdmin = ({
  data,
  parentId,
  dataFromSSR,
}: {
  dataFromSSR: Admin__Core_Plugins__Nav__ShowQuery['admin__core_plugins__nav__show'];
  data?: ShowAdminNavPluginsObj;
  parentId?: string;
}) => {
  const t = useTranslations('admin.core.plugins.dev.nav');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { code } = useParams();

  const formSchema = z.object({
    code: z.string().min(3).max(50),
    icon: z.string().optional(),
    href: z.string().min(1).max(100),
    parent_code: z
      .enum(['none', ...dataFromSSR.map(nav => nav.code)])
      .default(parentId || 'none'),
    keywords: z.array(z.object({ id: z.number(), value: z.string() })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: data?.code ?? '',
      icon: data?.icon ?? '',
      href: data?.href ?? '',
      parent_code: parentId ?? 'null',
      keywords:
        data?.keywords.map(keyword => ({
          id: Math.random() * 1000,
          value: keyword,
        })) ?? [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!code) return;
    let error: FetcherErrorType | null = null;

    if (data) {
      const mutation = await editMutationApi({
        ...values,
        previousCode: data.code,
        pluginCode: Array.isArray(code) ? code[0] : code,
        parentCode:
          values.parent_code === 'null' ? undefined : values.parent_code,
        keywords: values.keywords.map(keyword => keyword.value),
      });

      if (mutation?.error) {
        error = mutation.error;
      }
    } else {
      const mutation = await createMutationApi({
        ...values,
        pluginCode: Array.isArray(code) ? code[0] : code,
        parentCode:
          values.parent_code === 'null' ? undefined : values.parent_code,
        keywords: values.keywords.map(keyword => keyword.value),
      });
      if (mutation?.error) {
        error = mutation.error;
      }
    }

    if (error) {
      if (error.extensions?.code === 'CODE_ALREADY_EXISTS') {
        form.setError('code', {
          message: t('create.code.exists'),
        });

        return;
      }

      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t(data ? 'edit.success' : 'create.success'));

    setOpen?.(false);
  };

  return {
    form,
    onSubmit,
    formSchema,
  };
};
