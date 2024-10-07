import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('../../create-edit/create-edit').then(module => ({
    default: module.CreateEditPermissionsAdminDevPluginAdmin,
  })),
);

export const EditActionItemPermissionsAdminDevPluginAdmin = (props: {
  data: Admin__Core_Plugins__Permissions_Admin__ShowQuery['admin__core_plugins__permissions_admin__show'][0];
  dataFromSSR: Admin__Core_Plugins__Permissions_Admin__ShowQuery;
  parentId: string | undefined;
}) => {
  const t = useTranslations('core.global');

  return (
    <Dialog>
      <TooltipWrapper content={t('edit')}>
        <DialogTrigger asChild>
          <Button ariaLabel={t('edit')} size="icon" variant="ghost">
            <Pencil />
          </Button>
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('edit')}</DialogTitle>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
