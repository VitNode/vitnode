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
import { ShowCoreNav } from '@/graphql/types';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ContentDeleteActionTableNavAdmin } from './content';

export const DeleteActionTableNavAdmin = (
  props: Pick<ShowCoreNav, 'children' | 'id' | 'name'>,
) => {
  const t = useTranslations('core');

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
        <ContentDeleteActionTableNavAdmin {...props} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
