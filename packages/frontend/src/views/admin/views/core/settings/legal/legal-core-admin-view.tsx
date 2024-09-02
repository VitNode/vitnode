import { Card, CardContent } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { getTranslations } from 'next-intl/server';

import { CreateLegalPage } from './create/create';

export const generateMetadataLegalSettingsAdmin = async () => {
  const t = await getTranslations('admin.core.settings.legal');

  return {
    title: t('title'),
  };
};

export const LegalSettingsAdminView = async () => {
  const t = await getTranslations('admin.core.settings.legal');

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <CreateLegalPage />
      </HeaderContent>

      <Card>
        <CardContent className="p-6">test</CardContent>
      </Card>
    </>
  );
};
