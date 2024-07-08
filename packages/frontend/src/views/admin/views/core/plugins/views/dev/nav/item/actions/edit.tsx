import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { useItemNavDevPluginAdmin } from '../hooks/use-item-nav-dev-plugin-admin';

import { ShowAdminNavPluginsObj } from '@/graphql/graphql';
import { FlatTree } from '@/helpers/flatten-tree';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

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
