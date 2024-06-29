import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SubmitDeleteActionsTableModeratorsStaffAdmin } from './submit';
import { mutationApi } from './mutation-api';

import { ShowAdminStaffModerators } from '../../../../../../../../../graphql/code';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  useAlertDialog,
} from '../../../../../../../../../components/ui/alert-dialog';
import { Button } from '../../../../../../../../../components/ui/button';

interface Props {
  data: Pick<ShowAdminStaffModerators, 'id'>;
}

export const ContentDeleteActionsTableModeratorsStaffAdmin = ({
  data: { id },
}: Props) => {
  const t = useTranslations('admin.members.staff.moderators.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });
    if (mutation.error) {
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
