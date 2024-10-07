import { useAlertDialog } from '@/components/ui/alert-dialog';
import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useDeletePermissionAdminPluginAdmin = ({
  id,
  parentId,
}: {
  parentId: string | undefined;
} & Pick<
  Admin__Core_Plugins__Permissions_Admin__ShowQuery['admin__core_plugins__permissions_admin__show'][0],
  'id'
>) => {
  const t = useTranslations('admin.core.plugins.dev.permissions-admin.delete');
  const tCore = useTranslations('core.global.errors');
  const { setOpen } = useAlertDialog();
  const { code: pluginCode } = useParams();

  const onSubmit = async () => {
    if (!pluginCode) return;

    const mutation = await mutationApi({
      pluginCode: Array.isArray(pluginCode) ? pluginCode[0] : pluginCode,
      id,
      parentId,
    });

    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    setOpen(false);
    toast.success(t('success'), {
      description: id,
    });
  };

  return { onSubmit };
};
