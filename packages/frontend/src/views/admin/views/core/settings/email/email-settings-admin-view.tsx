import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import {
  Admin__Core_Email_Settings__Show,
  Admin__Core_Email_Settings__ShowQuery,
  Admin__Core_Email_Settings__ShowQueryVariables,
} from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ActionsEmailSettingsAdmin } from './actions/actions';
import { ContentEmailSettingsAdmin } from './content';

const getData = async () => {
  const data = await fetcher<
    Admin__Core_Email_Settings__ShowQuery,
    Admin__Core_Email_Settings__ShowQueryVariables
  >({
    query: Admin__Core_Email_Settings__Show,
  });

  return data;
};

const permission = {
  plugin_code: 'core',
  group: 'settings',
  permission: 'can_manage_settings_email',
};

export const generateMetadataEmailSettingsAdmin =
  async (): Promise<Metadata> => {
    const perm = await checkAdminPermissionPageMetadata(permission);
    if (perm) return perm;
    const t = await getTranslations('admin_core.nav');

    return {
      title: t('settings_email'),
    };
  };

export const EmailSettingsAdminView = async () => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.email'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <ActionsEmailSettingsAdmin
          disabled={!data.admin__core_email_settings__show.is_enabled}
        />
      </HeaderContent>

      <Card className="p-6">
        <ContentEmailSettingsAdmin {...data} />
      </Card>
    </>
  );
};
