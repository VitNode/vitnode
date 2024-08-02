import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { createMutationApi } from './create-mutation-api';
import { editMutationApi } from './edit-mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { useTextLang } from '@/hooks/use-text-lang';
import { zodInput } from '@/helpers/zod';
import { ShowCoreNav } from '@/graphql/types';

export interface CreateEditNavAdminArgs {
  data?: Omit<ShowCoreNav, 'children'>;
}

export const useCreateEditNavAdmin = ({ data }: CreateEditNavAdminArgs) => {
  const t = useTranslations('admin.core.styles.nav');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const formSchema = z.object({
    name: z
      .array(
        z.object({
          language_code: zodInput.string,
          value: zodInput.string.min(3).max(100),
        }),
      )
      .min(1),
    description: z.array(
      z.object({
        language_code: zodInput.string,
        value: zodInput.string.max(200),
      }),
    ),
    href: zodInput.string.min(1).max(255),
    external: z.boolean(),
    icon: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      description: data?.description ?? [],
      href: data?.href ?? '',
      external: data?.external ?? false,
      icon: data?.icon ?? '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;

    if (data) {
      const mutation = await editMutationApi({ ...values, id: data.id });
      if (mutation?.error) {
        isError = true;
      }
    } else {
      const mutation = await createMutationApi(values);
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
    form,
    onSubmit,
  };
};
