import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'vitnode-frontend/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from 'vitnode-frontend/components/ui/alert-dialog';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Loader } from 'vitnode-frontend/components/ui/loader';

import { ShowAdminGroups } from '@/graphql/hooks';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteGroupsMembersDialogAdmin,
  })),
);

export const DeleteGroupsMembersDialogAdmin = (
  props: Pick<ShowAdminGroups, 'id' | 'name' | 'protected'>,
) => {
  const t = useTranslations('core');

  if (props.protected) return null;

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="destructiveGhost"
                size="icon"
                ariaLabel={t('delete')}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>

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
