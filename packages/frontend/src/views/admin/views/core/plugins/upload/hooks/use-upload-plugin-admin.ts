import { useDialog } from '@/components/ui/dialog';
import { zodFile } from '@/helpers/zod';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { UploadPluginAdminProps } from '../upload';
import { mutationApi } from './mutation-api';

export const useUploadPluginAdmin = ({ data }: UploadPluginAdminProps) => {
  const t = useTranslations('admin.core.plugins.upload');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const formSchema = z.object({
    file: zodFile,
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    if (!(values.file instanceof File)) return;

    const formData = new FormData();
    formData.append('file', values.file);
    if (data) {
      formData.append('code', data.code);
    }

    const mutation = await mutationApi(formData);
    if (mutation?.error) {
      const error = mutation.error;

      if (
        error === 'PLUGIN_ALREADY_EXISTS' ||
        error === 'PLUGIN_VERSION_IS_LOWER'
      ) {
        form.setError('file', {
          message: t(`errors.${error}`),
        });

        return;
      }

      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t(data ? 'success.update' : 'success.title'), {
      description: t('success.desc'),
    });
    setOpen?.(false);
  };

  return { onSubmit, formSchema };
};
