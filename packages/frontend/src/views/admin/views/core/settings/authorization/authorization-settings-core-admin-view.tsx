import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Authorization_Settings__Show,
  Admin__Core_Authorization_Settings__ShowQuery,
} from '@/graphql/queries/admin/settings/authorization/admin__core_authorization_settings__show.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentAuthorizationSettingsCoreAdmin } from './content';

const getData = async () => {
  const data = await fetcher<Admin__Core_Authorization_Settings__ShowQuery>({
    query: Admin__Core_Authorization_Settings__Show,
  });

  return data;
};

export const generateMetadataAuthorizationSettingsAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin_core.nav');

    return {
      title: t('settings_authorization'),
    };
  };

export const AuthorizationSettingsCoreAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin_core.nav'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent h1={t('settings_authorization')} />

      <Card className="p-6">
        <ContentAuthorizationSettingsCoreAdmin {...data} />
      </Card>
    </>
  );
};
