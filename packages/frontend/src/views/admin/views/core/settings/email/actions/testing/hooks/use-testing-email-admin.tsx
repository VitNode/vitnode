import { useDialog } from '@/components/ui/dialog';
import { useSessionAdmin } from '@/hooks/use-session-admin';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useTestingEmailAdmin = () => {
  const t = useTranslations('admin.core.settings.email.test');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { session } = useSessionAdmin();
  const formSchema = z.object({
    from: z.string().min(1).email().default(''),
    to: z
      .string()
      .min(1)
      .email()
      .default(session?.email ?? ''),
    subject: z.string().min(1).default(t('test.subject')),
    message: z.string().min(1).default(t('test.message')),
    preview_text: z.string().default(t('test.preview_text')).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      ...values,
      previewText: values.preview_text,
    });

    if (mutation?.error) {
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

  return { onSubmit, formSchema };
};
