import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';
import { useTranslations } from 'next-intl';

import { useDeletePermissionAdminPluginAdmin } from './hooks/use-delete-permission-admin-plugin-admin';
import { SubmitDeleteActionItemPermissionsAdminDevPluginAdmin } from './submit';

export const ContentDeleteActionItemPermissionsAdminDevPluginAdmin = ({
  id,
  parentId,
  children,
}: {
  parentId: string | undefined;
} & Admin__Core_Plugins__Permissions_Admin__ShowQuery['admin__core_plugins__permissions_admin__show'][0]) => {
  const t = useTranslations('admin.core.plugins.dev.permissions-admin.delete');
  const tCore = useTranslations('core.global');
  const { onSubmit } = useDeletePermissionAdminPluginAdmin({ id, parentId });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            id: () => <span className="text-foreground font-bold">{id}</span>,
          })}
        </AlertDialogDescription>

        {children.length > 0 && (
          <Alert variant="warn">
            <AlertTitle>{t('children_warn.title')}</AlertTitle>
            <AlertDescription>{t('children_warn.desc')}</AlertDescription>
          </Alert>
        )}
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore('cancel')}
          </Button>
        </AlertDialogCancel>
        <SubmitDeleteActionItemPermissionsAdminDevPluginAdmin />
      </AlertDialogFooter>
    </form>
  );
};
