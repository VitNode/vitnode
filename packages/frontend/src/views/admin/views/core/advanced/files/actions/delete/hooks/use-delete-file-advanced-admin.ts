import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

import { useAlertDialog } from '../../../../../../../../../components/ui/alert-dialog';

interface Args {
  file_name_original: string;
  id: number;
}

export const useDeleteFileAdvancedAdmin = ({
  file_name_original,
  id,
}: Args) => {
  const t = useTranslations('admin.core.advanced.files.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({
      id,
    });
    if (mutation.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('success'), {
      description: file_name_original,
    });

    setOpen(false);
  };

  return { onSubmit };
};
