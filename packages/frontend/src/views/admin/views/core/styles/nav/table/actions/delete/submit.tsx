import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import { Button } from '../../../../../../../../../components/ui/button';

export const SubmitDeleteActionTableNavAdmin = () => {
  const t = useTranslations('admin.core.styles.nav.delete');
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" loading={pending}>
      {t('submit')}
    </Button>
  );
};
