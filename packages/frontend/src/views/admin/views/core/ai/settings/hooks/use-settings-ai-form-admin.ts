import { Admin__Core_Ai__ShowQuery } from '@/graphql/queries/admin/ai/admin__core_ai__show.generated';
import { AiProvider } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';
import { GoogleGenerativeAIModelId, OpenAiGenerativeAIModelId } from './types';

export const useSettingsAiFormAdmin = (
  data: Admin__Core_Ai__ShowQuery['admin__core_ai__show'],
) => {
  const t = useTranslations('core.global');
  const formSchema = z
    .object({
      provider: z.nativeEnum(AiProvider).default(data.provider),
      key: z.string().default('').optional(),
      model: z
        .string()
        .default(data.model ?? '')
        .optional(),
    })
    .refine(data => {
      // Make required if provider is not none
      if (data.provider !== AiProvider.none && !data.model) {
        return false;
      }

      // Check if model is valid
      const modelMap = {
        [AiProvider.google]: GoogleGenerativeAIModelId,
        [AiProvider.openai]: OpenAiGenerativeAIModelId,
      };
      const validModels = modelMap[data.provider] || [];
      const model = validModels.includes(data.model) ? data.model : '';
      if (!model) return false;

      return true;
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.model) return;
    const mutation = await mutationApi({ ...values, model: values.model });
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
