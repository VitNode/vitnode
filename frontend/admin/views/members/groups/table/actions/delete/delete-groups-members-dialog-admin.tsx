import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Suspense, lazy } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import type { ShowAdminGroups } from '@/graphql/hooks';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader } from '@/components/loader/loader';

const ContentDeleteGroupsMembersDialogAdmin = lazy(() =>
  import('./content-delete-groups-members-dialog-admin').then(module => ({
    default: module.ContentDeleteGroupsMembersDialogAdmin
  }))
);

interface Props {
  data: Pick<ShowAdminGroups, 'id' | 'name' | 'protected'>;
}

export const DeleteGroupsMembersDialogAdmin = ({ data }: Props) => {
  const t = useTranslations('core');

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="destructiveGhost" size="icon" tooltip={t('delete')}>
                <Trash2 />
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>

          <TooltipContent>{t('delete')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <ContentDeleteGroupsMembersDialogAdmin data={data} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
