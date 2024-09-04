import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
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
import {
  ContentDeleteActionTableNavDevPluginAdmin,
  ContentDeleteActionTableNavDevPluginAdminProps,
} from './content';

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
        <ContentDeleteActionTableNavDevPluginAdmin
          {...props}
          parentCode={parentId}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};
