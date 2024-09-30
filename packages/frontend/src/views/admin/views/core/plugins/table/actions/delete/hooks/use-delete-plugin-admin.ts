import { useAlertDialog } from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useDeletePluginAdmin = ({ code }: { code: string }) => {
  const t = useTranslations('admin.core.plugins.delete');
  const tCore = useTranslations('core.global.errors');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ code });

    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    setOpen(false);
    toast.success(t('success.title'), {
      description: t('success.desc'),
    });

    // Wait 3 seconds before reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return {
    onSubmit,
  };
};
