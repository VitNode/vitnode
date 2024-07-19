import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { createMutationApi } from './create-mutation-api';
import { editMutationApi } from './edit-mutation-api';
import { ShowAdminNavPluginsObj } from '@/graphql/graphql';
import { useDialog } from '@/components/ui/dialog';
import { zodInput } from '@/helpers/zod';
import { ErrorType } from '@/graphql/fetcher';

export const useCreateNavPluginAdmin = ({
  data,
  parentId,
}: {
  data?: ShowAdminNavPluginsObj;
  parentId?: string;
}) => {
  const t = useTranslations('admin.core.plugins.dev.nav');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { code } = useParams();
  const formSchema = z.object({
    code: zodInput.string.min(3).max(50),
    icon: z.string(),
    href: zodInput.string.min(1).max(100),
    parent_code: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: data?.code ?? '',
      icon: data?.icon ?? '',
      href: data?.href ?? '',
      parent_code: parentId ?? 'null',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (data) {
        await editMutationApi({
          ...values,
          previousCode: data.code,
          pluginCode: Array.isArray(code) ? code[0] : code,
          parentCode: values.parent_code === 'null' ? null : values.parent_code,
        });
      } else {
        await createMutationApi({
          ...values,
          pluginCode: Array.isArray(code) ? code[0] : code,
          parentCode: values.parent_code === 'null' ? null : values.parent_code,
        });
      }
    } catch (err) {
      const error = err as ErrorType;

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
  };
};
