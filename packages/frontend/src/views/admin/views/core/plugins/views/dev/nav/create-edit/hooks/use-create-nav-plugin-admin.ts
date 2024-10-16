import { useDialog } from '@/components/ui/dialog';
import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { zodTag } from '@/helpers/zod';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { createMutationApi } from './create-mutation-api';
import { editMutationApi } from './edit-mutation-api';

export const useCreateNavPluginAdmin = ({
  data,
  parentId,
  dataFromSSR,
}: {
  data?: ShowAdminNavPluginsObj;
  dataFromSSR: Admin__Core_Plugins__Nav__ShowQuery['admin__core_plugins__nav__show'];
  parentId?: string;
}) => {
  const t = useTranslations('admin.core.plugins.dev.nav');
  const tCore = useTranslations('core.global.errors');
  const { setOpen } = useDialog();
  const { code } = useParams();

  const formSchema = z.object({
    code: z
      .string()
      .min(3)
      .max(50)
      .default(data?.code ?? ''),
    parent_code: z
      .enum(['null', ...dataFromSSR.map(nav => nav.code)])
      .default(parentId ?? 'null'),
    icon: z
      .string()
      .default(data?.icon ?? '')
      .optional(),
    keywords: zodTag
      .default(
        data?.keywords.map(keyword => ({
          id: Math.random() * 1000,
          value: keyword,
        })) ?? [],
      )
      .optional(),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    if (!code) return;
    let error = '';

    if (data) {
      const mutation = await editMutationApi({
        ...values,
        previousCode: data.code,
        pluginCode: Array.isArray(code) ? code[0] : code,
        parentCode:
          values.parent_code === 'null' ? undefined : values.parent_code,
        keywords: (values.keywords ?? []).map(keyword => keyword.value),
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
        keywords: (values.keywords ?? []).map(keyword => keyword.value),
      });
      if (mutation?.error) {
        error = mutation.error;
      }
    }

    if (error) {
      if (error === 'CODE_ALREADY_EXISTS') {
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

    setOpen?.(false);
    toast.success(t(data ? 'edit.success' : 'create.success'));
  };

  return {
    onSubmit,
    formSchema,
  };
};
