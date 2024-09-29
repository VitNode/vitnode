import { useDialog } from '@/components/ui/dialog';
import { zodLanguageInput } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useFormCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations('admin.members.staff');
  const tCore = useTranslations('core.global');
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z.object({
    type: z.enum(['group', 'user']),
    user: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .optional(),
    group: z
      .object({
        id: z.number(),
        name: zodLanguageInput,
      })
      .optional(),
    unrestricted: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'group',
      unrestricted: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      groupId: values.type === 'group' ? values.group?.id : undefined,
      userId: values.type === 'user' ? values.user?.id : undefined,
      unrestricted: values.unrestricted,
    });

    if (mutation?.error) {
      if (mutation.error === 'ALREADY_EXISTS') {
        form.setError(values.type === 'user' ? 'user' : 'group', {
          type: 'manual',
          message: t('already_exists'),
        });

        return;
      }

      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t('moderators.add.success'), {
      description:
        values.type === 'group'
          ? convertText(values.group?.name)
          : values.user?.name,
    });
  };

  return {
    form,
    onSubmit,
  };
};
