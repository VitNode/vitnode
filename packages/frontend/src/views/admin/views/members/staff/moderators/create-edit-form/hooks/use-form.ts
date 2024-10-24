import { useDialog } from '@/components/ui/dialog';
import { zodComboBoxWithFetcher } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useFormCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations('admin.members.staff.moderators.add');
  const tShared = useTranslations('admin.members.staff.shared');
  const tCore = useTranslations('core.global');
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z
    .object({
      type: z.enum(['group', 'user']).default('group'),
      user: zodComboBoxWithFetcher.optional(),
      group: zodComboBoxWithFetcher.optional(),
      unrestricted: z.boolean().default(true),
    })
    .refine(data => {
      return data.type === 'group' ? data.group : data.user;
    });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const mutation = await mutationApi({
      groupId:
        values.type === 'group' && values.group?.[0].key
          ? +values.group[0].key
          : undefined,
      userId:
        values.type === 'user' && values.user?.[0].key
          ? +values.user[0].key
          : undefined,
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
    toast.success(t('success'), {
      description:
        values.type === 'group' && Array.isArray(values.group?.[0].value)
          ? convertText(values.group[0].value)
          : Array.isArray(values.user?.[0].value)
            ? null
            : values.user?.[0].value,
    });
  };

  return {
    onSubmit,
    formSchema,
  };
};
