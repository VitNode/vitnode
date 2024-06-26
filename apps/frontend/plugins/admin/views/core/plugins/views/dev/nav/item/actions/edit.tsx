import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { FlatTree } from 'vitnode-frontend/helpers/flatten-tree';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'vitnode-frontend/components/ui/tooltip';
import { Button } from 'vitnode-frontend/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'vitnode-frontend/components/ui/dialog';
import { Loader } from 'vitnode-frontend/components/ui/loader';

import { ShowAdminNavPluginsObj } from '@/graphql/hooks';
import { useItemNavDevPluginAdmin } from '../hooks/use-item-nav-dev-plugin-admin';

const Content = React.lazy(async () =>
  import('../../create-edit/create-edit').then(module => ({
    default: module.CreateEditNavDevPluginAdmin,
  })),
);

export const EditActionTableNavDevPluginAdmin = (
  data: FlatTree<ShowAdminNavPluginsObj>,
) => {
  const t = useTranslations('core');
  const rest = useItemNavDevPluginAdmin();

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" ariaLabel={t('edit')}>
                <Pencil />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t('edit')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <React.Suspense fallback={<Loader />}>
          <Content data={data} {...rest} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
