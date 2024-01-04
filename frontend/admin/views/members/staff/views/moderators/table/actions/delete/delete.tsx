import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader } from '@/components/loader/loader';
import type { ShowAdminStaffModerators } from '@/graphql/hooks';

const ContentDeleteActionsTableModeratorsStaffAdmin = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionsTableModeratorsStaffAdmin
  }))
);

interface Props {
  data: Pick<ShowAdminStaffModerators, 'id'>;
}

export const DeleteActionsTableModeratorsStaffAdmin = (props: Props) => {
  const t = useTranslations('core');

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="destructiveGhost" size="icon">
                <Trash2 />
                <span className="sr-only">{t('delete')}</span>
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>

          <TooltipContent>{t('delete')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <ContentDeleteActionsTableModeratorsStaffAdmin {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
