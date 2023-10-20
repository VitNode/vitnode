import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormGeneralCoreAdmin } from './form/form-general-core-admin';

import { Tabs } from '../../../../components/tabs/tabs';

export const GeneralCoreAdminView = () => {
  const t = useTranslations('admin');

  return (
    <>
      <HeaderContent h2={t('nav.core.general')} desc="123 desc">
        <Button>{t('nav.core.general')}</Button>
        <Button>Tes 123t</Button>
      </HeaderContent>

      <Tabs
        className="mb-4"
        items={[
          {
            text: 'Tes 123t',
            href: '/admin/core/general'
          },
          {
            text: 'Tes 123',
            href: '/admin/core/general/123'
          },
          {
            text: 'Tes 121233',
            href: '/admin/core/general/123213'
          },
          {
            text: 'Tessadasd 121233',
            href: '/admin/core/general/123sadasd213'
          }
        ]}
      />

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
