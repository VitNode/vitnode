import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { editMutationApi } from './edit-mutation-api';
import { createMutationApi } from './create-mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { ShowCoreLanguages } from '@/graphql/types';
import { timeZones } from '../timezones';
import { locales } from '../locales';

interface Args {
  data?: ShowCoreLanguages;
}

export const useCreateEditLangAdmin = ({ data }: Args) => {
  const t = useTranslations('admin.core.langs.actions');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();

  const formSchema = z.object({
    code: z
      .string()
      .min(1)
      .default(data?.code ?? ''),
    name: z
      .string()
      .min(1)
      .default(data?.name ?? ''),
    timezone: z
      .enum(timeZones as [string, ...string[]])
      .default(data?.timezone ?? 'America/New_York'),
    locale: z
      .enum(locales.map(item => item.locale) as [string, ...string[]])
      .default(data?.locale ?? 'en'),
    default: z.boolean().default(data?.default ?? false),
    time_24: z.boolean().default(data?.time_24 ?? false),
    allow_in_input: z.boolean().default(data?.allow_in_input ?? true),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;

    if (data) {
      const mutation = await editMutationApi({
        ...data,
        ...values,
        time24: values.time_24,
        allowInInput: values.allow_in_input,
      });

      if (mutation?.error) {
        isError = true;
      }
    } else {
      const mutation = await createMutationApi({
        ...values,
        time24: values.time_24,
        allowInInput: values.allow_in_input,
      });

      if (mutation?.error) {
        isError = true;
      }
    }

    if (isError) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast(t(data ? 'edit.success' : 'create.success'), {
      description: values.name,
    });
    setOpen?.(false);
  };

  return {
    formSchema,
    onSubmit,
  };
};
