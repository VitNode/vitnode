import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import { getGlobalData } from '@/graphql/get-global-data';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
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
    cache: 'force-cache',
  });

  return data;
};

const permission = {
  plugin_code: 'core',
  group: 'settings',
  permission: 'can_manage_settings_authorization',
};

export const generateMetadataAuthorizationSettingsAdmin =
  async (): Promise<Metadata> => {
    const perm = await checkAdminPermissionPageMetadata(permission);
    if (perm) return perm;
    const t = await getTranslations('admin_core.nav');

    return {
      title: t('settings_authorization'),
    };
  };

export const AuthorizationSettingsCoreAdminView = async () => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const [
    t,
    data,
    {
      core_middleware__show: { is_email_enabled },
    },
  ] = await Promise.all([
    getTranslations('admin_core.nav'),
    getData(),
    getGlobalData(),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.settings.authorization">
      <HeaderContent h1={t('settings_authorization')} />

      <Card className="p-6">
        <ContentAuthorizationSettingsCoreAdmin
          isEmailEnabled={is_email_enabled}
          {...data}
        />
      </Card>
    </TranslationsProvider>
  );
};
