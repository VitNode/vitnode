import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { ShowCoreNav } from '@/graphql/types';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionTableNavAdmin,
  })),
);

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
                variant="destructiveGhost"
                size="icon"
                ariaLabel={t('delete')}
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
          <Content {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
