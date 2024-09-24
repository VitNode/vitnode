import { useAlertDialog } from '@/components/ui/alert-dialog';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { ContentDeleteActionTableNavDevPluginAdmin } from '../content';
import { mutationApi } from './mutation-api';

export const useDeleteNavPluginAdmin = ({
  code,
  parentId,
}: React.ComponentProps<typeof ContentDeleteActionTableNavDevPluginAdmin>) => {
  const t = useTranslations('admin.core.plugins.dev.nav.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();
  const { code: pluginCode } = useParams();

  const onSubmit = async () => {
    if (!pluginCode) return;

    const mutation = await mutationApi({
      code,
      pluginCode: Array.isArray(pluginCode) ? pluginCode[0] : pluginCode,
      parentCode: parentId,
    });

    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen(false);
    toast.success(t('success'), {
      description: code,
    });
  };

  return { onSubmit };
};
