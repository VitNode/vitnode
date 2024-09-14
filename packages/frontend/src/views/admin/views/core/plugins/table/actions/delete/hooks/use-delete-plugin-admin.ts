import { useAlertDialog } from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useDeletePluginAdmin = ({ code }: { code: string }) => {
  const t = useTranslations('admin.core.plugins.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ code });

    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen(false);
    toast.success(t('success.title'), {
      description: t('success.desc'),
    });
    window.location.reload();
  };

  return {
    onSubmit,
  };
};
