import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { mutationApi } from './mutation-api';
import { Core_GlobalQuery } from '@/graphql/queries/core_global.generated';
import { AllowTypeFilesEnum } from '@/graphql/types';

export const useEditorAdmin = (
  data: Core_GlobalQuery['core_middleware__show']['editor'],
) => {
  const t = useTranslations('core');
  const formSchema = z.object({
    sticky: z.boolean().default(data.sticky),
    files: z.object({
      allow_type: z
        .nativeEnum(AllowTypeFilesEnum)
        .default(data.files.allow_type),
    }),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const mutation = await mutationApi(values);

    if (mutation?.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
    form.reset(values);
  };

  return {
    formSchema,
    onSubmit,
  };
};
