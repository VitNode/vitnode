import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Email_Settings__Show,
  Admin__Core_Email_Settings__ShowQuery,
  Admin__Core_Email_Settings__ShowQueryVariables,
} from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { EmailProvider } from '@/graphql/types';
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

export const generateMetadataEmailSettingsAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin_core.nav');

    return {
      title: t('settings_email'),
    };
  };

export const EmailSettingsAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.email'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} desc={t('desc')}>
        <ActionsEmailSettingsAdmin
          disabled={
            data.admin__core_email_settings__show.provider ===
            EmailProvider.none
          }
        />
      </HeaderContent>

      <Card className="p-6">
        <ContentEmailSettingsAdmin {...data} />
      </Card>
    </>
  );
};
