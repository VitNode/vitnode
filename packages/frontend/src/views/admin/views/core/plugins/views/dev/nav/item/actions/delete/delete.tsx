import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useItemNavDevPluginAdmin } from '../../hooks/use-item-nav-dev-plugin-admin';
import { ContentDeleteActionTableNavDevPluginAdminProps } from './content';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionTableNavDevPluginAdmin,
  })),
);

export const DeleteActionTableNavDevPluginAdmin = (
  props: ContentDeleteActionTableNavDevPluginAdminProps,
) => {
  const t = useTranslations('core');
  const { parentId } = useItemNavDevPluginAdmin();

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                ariaLabel={t('delete')}
                size="icon"
                variant="destructiveGhost"
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t('delete')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} parentCode={parentId} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
