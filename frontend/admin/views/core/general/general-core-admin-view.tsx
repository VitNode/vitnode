import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FormGeneralCoreAdmin } from './form/form-general-core-admin';

export const GeneralCoreAdminView = () => {
  const t = useTranslations('admin');

  return (
    <>
      <HeaderContent h2={t('core.general.title')} />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('core.general.main.title')}</CardTitle>
        </CardHeader>

        <FormGeneralCoreAdmin />
      </Card>
    </>
  );
};
