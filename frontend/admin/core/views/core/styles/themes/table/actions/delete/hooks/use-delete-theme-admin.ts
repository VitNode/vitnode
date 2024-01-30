import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { useAlertDialog } from '@/components/ui/alert-dialog';

interface Args {
  id: number;
  name: string;
}

export const useDeleteThemeAdmin = ({ id, name }: Args) => {
  const t = useTranslations('admin.core.styles.themes.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });
    if (mutation.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error')
      });

      return;
    }

    toast.success(t('success'), {
      description: name
    });

    setOpen(false);
  };

  return {
    onSubmit
  };
};
