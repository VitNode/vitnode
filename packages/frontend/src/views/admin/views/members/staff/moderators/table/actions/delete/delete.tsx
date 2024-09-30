import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ShowAdminStaffModerators } from '@/graphql/types';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ContentDeleteActionsTableModeratorsStaffAdmin } from './content';

export const DeleteActionsTableModeratorsStaffAdmin = (props: {
  data: Pick<ShowAdminStaffModerators, 'id'>;
}) => {
  const t = useTranslations('core.global');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ariaLabel={t('delete')} size="icon" variant="destructiveGhost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <ContentDeleteActionsTableModeratorsStaffAdmin {...props} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
