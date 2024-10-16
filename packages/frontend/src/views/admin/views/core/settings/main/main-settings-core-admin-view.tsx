import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Main_Settings__Show,
  Core_Main_Settings__ShowQuery,
  Core_Main_Settings__ShowQueryVariables,
} from '@/graphql/queries/admin/settings/core_main_settings__show.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentMainSettingsCoreAdmin } from './content';

const getData = async () => {
  const data = await fetcher<
    Core_Main_Settings__ShowQuery,
    Core_Main_Settings__ShowQueryVariables
  >({
    query: Core_Main_Settings__Show,
    cache: 'force-cache',
  });

  return data;
};

export const generateMetadataMainSettingsCoreAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.core.settings.main');

    return {
      title: t('title'),
    };
  };

export const MainSettingsCoreAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.main'),
    getData(),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.settings.main">
      <HeaderContent desc={t('desc')} h1={t('title')} />

      <Card className="p-6">
        <ContentMainSettingsCoreAdmin {...data} />
      </Card>
    </TranslationsProvider>
  );
};
