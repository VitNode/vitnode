import { useDialog } from '@/components/ui/dialog';
import { Admin__Core_Groups__CreateMutationVariables } from '@/graphql/mutations/admin/members/groups/admin__core_groups__create.generated';
import { ShowAdminGroups } from '@/graphql/types';
import { zodLanguageInput } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationCreateApi } from './mutation-create-api';
import { mutationEditApi } from './mutation-edit-api';

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, 'color' | 'content' | 'id' | 'name'>;
}

export const useCreateEditFormGroupsMembersAdmin = ({
  data,
}: CreateEditFormGroupsMembersAdminArgs) => {
  const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const { push } = useRouter();

  const formSchema = z.object({
    main: z.object({
      name: zodLanguageInput.min(1).default(data?.name ?? []),
      color: z
        .string()
        .default(data?.color ?? '')
        .optional(),
    }),
    content: z.object({
      files_allow_upload: z
        .boolean()
        .default(data?.content.files_allow_upload ?? true)
        .optional(),
      files_total_max_storage: z.coerce
        .number()
        .min(-1)
        .default(data?.content.files_total_max_storage ?? 500000),
      files_max_storage_for_submit: z.coerce
        .number()
        .min(-1)
        .default(data?.content.files_max_storage_for_submit ?? 10000),
    }),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;

    const variables: Admin__Core_Groups__CreateMutationVariables = {
      name: values.main.name,
      color: values.main.color,
      content: {
        files_allow_upload: values.content.files_allow_upload ?? true,
        files_total_max_storage: values.content.files_total_max_storage,
        files_max_storage_for_submit:
          values.content.files_max_storage_for_submit,
      },
    };

    if (data) {
      const mutation = await mutationEditApi({
        id: data.id,
        ...variables,
      });
      if (mutation?.error) {
        isError = true;
      }
    } else {
      const mutation = await mutationCreateApi(variables);
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
      description: convertText(values.main.name),
    });

    setOpen?.(false);
  };

  return { formSchema, onSubmit, setValues, values };
};
