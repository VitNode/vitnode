import { useDialog } from '@/components/ui/dialog';
import { ShowCoreNav } from '@/graphql/types';
import { zodLanguageInput } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { createMutationApi } from './create-mutation-api';
import { editMutationApi } from './edit-mutation-api';

export interface CreateEditNavAdminArgs {
  data?: Omit<ShowCoreNav, 'children'>;
}

export const useCreateEditNavAdmin = ({ data }: CreateEditNavAdminArgs) => {
  const t = useTranslations('admin.core.styles.nav');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const formSchema = z.object({
    name: zodLanguageInput.min(1).default(data?.name ?? []),
    description: zodLanguageInput.default(data?.description ?? []).optional(),
    href: z
      .string()
      .min(1)
      .max(255)
      .default(data?.href ?? ''),
    icon: z
      .string()
      .default(data?.icon ?? '')
      .optional(),
    external: z
      .boolean()
      .default(data?.external ?? false)
      .optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;

    if (data) {
      const mutation = await editMutationApi({
        ...values,
        id: data.id,
        description: values.description ?? [],
        external: values.external ?? false,
      });
      if (mutation?.error) {
        isError = true;
      }
    } else {
      const mutation = await createMutationApi({
        ...values,
        description: values.description ?? [],
        external: values.external ?? false,
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

    toast.success(t(data ? 'edit.success' : 'create.success'), {
      description: convertText(values.name),
    });

    setOpen?.(false);
  };

  return {
    formSchema,
    onSubmit,
  };
};
