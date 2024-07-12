import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { useSessionAdmin } from '@/hooks/use-session-admin';

export const useTestingEmailAdmin = () => {
  const t = useTranslations('admin.core.settings.email.test');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { session } = useSessionAdmin();
  const formSchema = z.object({
    from: z.string().min(1).email(),
    to: z.string().min(1).email(),
    subject: z.string().min(1),
    message: z.string().min(1),
    preview_text: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: session?.email || '',
      subject: t('test.subject'),
      message: t('test.message'),
      preview_text: t('test.preview_text'),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutationApi({
        ...values,
        previewText: values.preview_text,
      });
    } catch (error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('success.title'), {
      description: t('success.desc'),
    });

    setOpen?.(false);
  };

  return { form, onSubmit };
};
