import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { ShowAdminStaffAdministrators } from '@/graphql/types';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const ContentDeleteActionsTableAdministratorsStaffAdmin = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionsAdministratorsStaffAdmin,
  })),
);

export const DeleteActionsTableAdministratorsStaffAdmin = (props: {
  data: Pick<ShowAdminStaffAdministrators, 'id'>;
}) => {
  const t = useTranslations('core');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ariaLabel={t('delete')} size="icon" variant="destructiveGhost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <ContentDeleteActionsTableAdministratorsStaffAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
