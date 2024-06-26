import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useDialog } from 'vitnode-frontend/components/ui/dialog';

import { useSessionAdmin } from '@/plugins/admin/hooks/use-session-admin';
import { mutationApi } from './mutation-api';

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: session?.email || '',
      subject: 'Test Email from Admin Panel',
      message:
        'This email confirms that your email settings in your website by VitNode are working correctly.',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi(values);

    if (mutation.error) {
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
