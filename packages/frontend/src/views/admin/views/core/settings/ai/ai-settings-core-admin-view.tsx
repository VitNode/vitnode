import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { getGlobalData } from '@/graphql/get-global-data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { TestingActionAiAdmin } from './actions/testing/testing';

export const generateMetadataAiSettingsAdmin = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.core.settings.ai');

  return {
    title: t('title'),
  };
};

export const AiSettingsCoreAdminView = async () => {
  const [
    t,
    {
      core_middleware__show: { is_ai_enabled },
    },
  ] = await Promise.all([
    getTranslations('admin.core.settings.ai'),
    getGlobalData(),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.settings.ai">
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <TestingActionAiAdmin disabled={!is_ai_enabled} />
      </HeaderContent>

      <Card className="p-6">
        <div>test</div>
      </Card>
    </TranslationsProvider>
  );
};
