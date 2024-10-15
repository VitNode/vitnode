import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { ShowAdminStaffAdministrators } from '@/graphql/types';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ContentDeleteActionsAdministratorsStaffAdmin } from './content';

export const DeleteActionsTableAdministratorsStaffAdmin = (props: {
  data: Pick<ShowAdminStaffAdministrators, 'id'>;
}) => {
  const t = useTranslations('core.global');

  return (
    <AlertDialog>
      <TooltipWrapper content={t('delete')}>
        <AlertDialogTrigger asChild>
          <Button
            ariaLabel={t('delete')}
            size="icon"
            variant="destructiveGhost"
          >
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
      </TooltipWrapper>

      <AlertDialogContent>
        <ContentDeleteActionsAdministratorsStaffAdmin {...props} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
