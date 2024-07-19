import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

import { ContentDeleteActionTableNavDevPluginAdminProps } from '../content';
import { mutationApi } from './mutation-api';
import { useAlertDialog } from '@/components/ui/alert-dialog';

export const useDeleteNavPluginAdmin = ({
  code,
  parentCode,
}: ContentDeleteActionTableNavDevPluginAdminProps) => {
  const t = useTranslations('admin.core.plugins.dev.nav.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();
  const { code: pluginCode } = useParams();

  const onSubmit = async () => {
    try {
      await mutationApi({
        code,
        pluginCode: Array.isArray(pluginCode) ? pluginCode[0] : pluginCode,
        parentCode,
      });
    } catch (error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('success'), {
      description: code,
    });

    setOpen(false);
  };

  return { onSubmit };
};
