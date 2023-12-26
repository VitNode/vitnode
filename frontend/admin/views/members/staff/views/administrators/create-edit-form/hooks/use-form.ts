import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import { mutationApi } from './mutation-api';
import { useToast } from '@/components/ui/use-toast';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { useDialog } from '@/components/ui/dialog';

export const useFormCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations('admin.members.staff.administrators');
  const tCore = useTranslations('core');
  const { toast } = useToast();
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z.object({
    type: z.enum(['group', 'user']),
    user: z
      .object({
        id: z.string(),
        name: z.string()
      })
      .optional(),
    group: z
      .object({
        id: z.string(),
        name: zodTextLanguageInputType
      })
      .optional(),
    unrestricted: z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'group',
      unrestricted: true
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);

    const mutation = await mutationApi({
      groupId: values.type === 'group' ? values.group?.id : undefined,
      memberId: values.type === 'user' ? values.user?.id : undefined,
      unrestricted: values.unrestricted
    });

    if (mutation.error) {
      toast({
        title: tCore('errors.title'),
        description: tCore('errors.internal_server_error'),
        variant: 'destructive'
      });

      return;
    }

    setOpen(false);
    toast({
      title: t('add.success'),
      description: values.type === 'group' ? convertText(values.group?.name) : values.user?.name
    });
  };

  return {
    form,
    onSubmit
  };
};
