import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useItemNavDevPluginAdmin } from '../hooks/use-item-nav-dev-plugin-admin';

const Content = React.lazy(async () =>
  import('../../create-edit/create-edit').then(module => ({
    default: module.CreateEditNavDevPluginAdmin,
  })),
);

export const EditActionTableNavDevPluginAdmin = (
  data: ShowAdminNavPluginsObj,
) => {
  const t = useTranslations('admin.core.plugins.dev.nav');
  const rest = useItemNavDevPluginAdmin();

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button ariaLabel={t('edit.title')} size="icon" variant="ghost">
                <Pencil />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t('edit.title')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('edit.title')}</DialogTitle>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <Content data={data} {...rest} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
