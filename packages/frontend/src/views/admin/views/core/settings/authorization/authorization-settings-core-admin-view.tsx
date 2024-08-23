import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { ContentAuthorizationSettingsCoreAdmin } from './content';

export const generateMetadataAuthorizationSettingsAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('core.admin.nav');

    return {
      title: t('settings_authorization'),
    };
  };

export const AuthorizationSettingsCoreAdminView = async () => {
  const t = await getTranslations('core.admin.nav');

  return (
    <>
      <HeaderContent h1={t('settings_authorization')} />

      <Card className="p-6">
        <ContentAuthorizationSettingsCoreAdmin />
      </Card>
    </>
  );
};
