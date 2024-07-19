import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { useAlertDialog } from '@/components/ui/alert-dialog';

interface Args {
  code: string;
  name: string;
}

export const useDeletePluginAdmin = ({ code, name }: Args) => {
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

    toast.success(t('success'), {
      description: name,
    });

    setOpen(false);
  };

  return {
    onSubmit,
  };
};
