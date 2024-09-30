import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  useAlertDialog,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ShowAdminStaffModerators } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { SubmitDeleteActionsTableModeratorsStaffAdmin } from './submit';

export const ContentDeleteActionsTableModeratorsStaffAdmin = ({
  data: { id },
}: {
  data: Pick<ShowAdminStaffModerators, 'id'>;
}) => {
  const t = useTranslations('admin.members.staff.moderators.delete');
  const tCore = useTranslations('core.global');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });
    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('success'));

    setOpen(false);
  };

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_absolutely_sure')}</AlertDialogTitle>
        <AlertDialogDescription>{t('desc')}</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore('cancel')}
          </Button>
        </AlertDialogCancel>
        <SubmitDeleteActionsTableModeratorsStaffAdmin />
      </AlertDialogFooter>
    </form>
  );
};
