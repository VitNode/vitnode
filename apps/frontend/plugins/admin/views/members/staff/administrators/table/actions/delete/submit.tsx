import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { Button } from 'vitnode-frontend/components/ui/button';

export const SubmitDeleteActionsTableAdministratorsStaffAdmin = () => {
  const t = useTranslations('admin.members.staff.administrators.delete');
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" loading={pending}>
      {t('submit')}
    </Button>
  );
};
