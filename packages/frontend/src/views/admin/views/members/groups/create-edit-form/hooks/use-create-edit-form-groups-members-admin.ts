import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { mutationCreateApi } from './mutation-create-api';
import { mutationEditApi } from './mutation-edit-api';
import { useDialog } from '@/components/ui/dialog';
import { ShowAdminGroups } from '@/graphql/graphql';
import { useTextLang } from '@/hooks/use-text-lang';
import { usePathname, useRouter } from '@/navigation';
import { zodInput } from '@/helpers/zod';

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, 'color' | 'content' | 'id' | 'name'>;
}

export const useCreateEditFormGroupsMembersAdmin = ({
  data,
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const { push } = useRouter();

  const formSchema = z.object({
    name: zodInput.languageInput.min(1),
    color: zodInput.string,
    content: z.object({
      files_allow_upload: z.boolean(),
      files_total_max_storage: z.number(),
      files_max_storage_for_submit: z.number().min(-1),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      color: data?.color ?? '',
      content: data?.content ?? {
        files_allow_upload: true,
        files_total_max_storage: 500000,
        files_max_storage_for_submit: 10000,
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;

    if (data) {
      const mutation = await mutationEditApi({
        id: data.id,
        ...values,
      });
      if (mutation?.error) {
        isError = true;
      }
    } else {
      const mutation = await mutationCreateApi(values);
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

    push(pathname);

    toast.success(data ? t('edit.success') : t('create.success'), {
      description: convertText(values.name),
    });

    setOpen?.(false);
  };

  return { form, formSchema, onSubmit };
};
