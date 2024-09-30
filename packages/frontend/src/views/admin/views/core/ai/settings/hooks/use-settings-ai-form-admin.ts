import { Admin__Core_Ai__ShowQuery } from '@/graphql/queries/admin/ai/admin__core_ai__show.generated';
import { AiProvider } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useSettingsAiFormAdmin = (
  data: Admin__Core_Ai__ShowQuery['admin__core_ai__show'],
) => {
  const t = useTranslations('core.global');
  const formSchema = z.object({
    provider: z.nativeEnum(AiProvider).default(data.provider),
    key: z.string().default('').optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi(values);
    if (mutation?.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
  };

  return { formSchema, onSubmit };
};
