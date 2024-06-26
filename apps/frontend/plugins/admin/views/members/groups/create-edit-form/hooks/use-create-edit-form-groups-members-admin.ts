import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'vitnode-frontend/navigation';
import { zodInput } from 'vitnode-frontend/helpers/zod';
import { useDialog } from 'vitnode-frontend/components/ui/dialog';

import { ShowAdminGroups } from '@/graphql/hooks';
import { mutationCreateApi } from './mutation-create-api';
import { mutationEditApi } from './mutation-edit-api';
import { useTextLang } from '@/plugins/core/hooks/use-text-lang';

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, 'content' | 'id' | 'name'>;
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
      color: '',
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
      const mutationEdit = await mutationEditApi({
        id: data.id,
        ...values,
      });

      if (mutationEdit.error) {
        isError = true;
      }
    } else {
      const mutationCreate = await mutationCreateApi(values);

      if (mutationCreate.error) {
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
