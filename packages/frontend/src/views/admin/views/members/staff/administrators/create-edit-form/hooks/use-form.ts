import { useDialog } from '@/components/ui/dialog';
import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { zodComboBoxWithFetcher } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useFormCreateEditFormGroupsMembersAdmin = ({
  data,
}: {
  data?: Admin__Core_Staff_Administrators__ShowQuery['admin__core_staff_administrators__show']['edges'][0];
}) => {
  const t = useTranslations('admin.members.staff.administrators');
  const tShared = useTranslations('admin.members.staff.shared');
  const tCore = useTranslations('core.global');
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z
    .object({
      type: z
        .enum(['group', 'user'])
        .default(data?.user_or_group.__typename === 'User' ? 'user' : 'group'),
      user: zodComboBoxWithFetcher
        .default(
          data?.user_or_group.__typename === 'User'
            ? [
                {
                  key: data.user_or_group.id.toString(),
                  value: data.user_or_group.name,
                },
              ]
            : [],
        )
        .optional(),
      group: zodComboBoxWithFetcher
        .default(
          data?.user_or_group.__typename === 'StaffGroupUser'
            ? [
                {
                  key: data.user_or_group.id.toString(),
                  value: data.user_or_group.group_name,
                },
              ]
            : [],
        )
        .optional(),
      unrestricted: z
        .boolean()
        .default(data ? data.permissions.length === 0 : true),
      permissions: z
        .array(
          z.object({
            plugin_code: z.string(),
            groups: z.array(
              z.object({
                id: z.string(),
                permissions: z.array(z.string()),
              }),
            ),
          }),
        )
        .default(data?.permissions ?? []),
    })
    .refine(data => {
      return data.type === 'group' ? data.group : data.user;
    });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const mutation = await mutationApi({
      groupId: data
        ? undefined
        : values.type === 'group' && values.group?.[0].key
          ? +values.group[0].key
          : undefined,
      userId: data
        ? undefined
        : values.type === 'user' && values.user?.[0].key
          ? +values.user[0].key
          : undefined,
      permissions: values.unrestricted ? [] : values.permissions,
      id: data?.id,
    });

    if (mutation?.error) {
      if (mutation.error === 'ALREADY_EXISTS') {
        form.setError(values.type === 'user' ? 'user' : 'group', {
          type: 'manual',
          message: tShared('already_exists'),
        });

        return;
      }

      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t(data ? 'edit.success' : 'add.success'), {
      description:
        values.type === 'group' && Array.isArray(values.group?.[0].value)
          ? convertText(values.group[0].value)
          : Array.isArray(values.user?.[0].value)
            ? null
            : values.user?.[0].value,
    });
  };

  return {
    formSchema,
    onSubmit,
  };
};
