import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormGeneralCoreAdmin } from './form/form-general-core-admin';

export const GeneralCoreAdminView = () => {
  const t = useTranslations('admin');

  return (
    <>
      <HeaderContent h2={t('nav.core.general')} desc="123 desc">
        <Button>{t('nav.core.general')}</Button>
        <Button>Tes 123t</Button>
      </HeaderContent>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('core.general.main.title')}</CardTitle>
          <CardDescription>desc</CardDescription>
        </CardHeader>

        <FormGeneralCoreAdmin />
      </Card>
    </>
  );
};
