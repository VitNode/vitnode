import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import * as React from 'react';

import { ShowAdminGroups } from '../../../../../../../../graphql/graphql';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '../../../../../../../../components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../../../../../components/ui/tooltip';
import { Button } from '../../../../../../../../components/ui/button';
import { Loader } from '../../../../../../../../components/ui/loader';

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
