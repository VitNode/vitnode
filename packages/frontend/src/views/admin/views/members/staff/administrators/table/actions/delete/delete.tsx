import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ShowAdminStaffAdministrators } from '@/graphql/graphql';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

const ContentDeleteActionsTableAdministratorsStaffAdmin = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionsAdministratorsStaffAdmin,
  })),
);

interface Props {
  data: Pick<ShowAdminStaffAdministrators, 'id'>;
}

export const DeleteActionsTableAdministratorsStaffAdmin = (props: Props) => {
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
          <ContentDeleteActionsTableAdministratorsStaffAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
