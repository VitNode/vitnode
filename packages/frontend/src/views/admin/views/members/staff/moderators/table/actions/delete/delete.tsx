import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { ShowAdminStaffModerators } from '@/graphql/types';

const ContentDeleteActionsTableModeratorsStaffAdmin = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionsTableModeratorsStaffAdmin,
  })),
);

export const DeleteActionsTableModeratorsStaffAdmin = (props: {
  data: Pick<ShowAdminStaffModerators, 'id'>;
}) => {
  const t = useTranslations('core');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveGhost" size="icon" ariaLabel={t('delete')}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <ContentDeleteActionsTableModeratorsStaffAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
