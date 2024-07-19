import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { ActionsEmailSettingsAdmin } from './actions/actions';
import { ContentEmailSettingsAdmin } from './content';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Email_Settings__Show,
  Admin__Core_Email_Settings__ShowQuery,
  Admin__Core_Email_Settings__ShowQueryVariables,
} from '@/graphql/graphql';

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
    const t = await getTranslations('core.admin.nav');

    return {
      title: t('settings_email'),
    };
  };

export const EmailSettingsAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('core.admin.nav'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent h1={t('settings_email')}>
        {data.admin__core_email_settings__show.smtp_host && (
          <ActionsEmailSettingsAdmin />
        )}
      </HeaderContent>

      <Card className="p-6">
        <ContentEmailSettingsAdmin {...data} />
      </Card>
    </>
  );
};
