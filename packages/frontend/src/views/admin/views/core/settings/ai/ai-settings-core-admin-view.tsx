import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { getGlobalData } from '@/graphql/get-global-data';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { TestingActionAiAdmin } from './actions/testing/testing';

const permission = {
  plugin_code: 'core',
  group: 'settings',
  permission: 'can_manage_settings_ai',
};

export const generateMetadataAiSettingsAdmin = async (): Promise<Metadata> => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin.core.settings.ai');

  return {
    title: t('title'),
  };
};

export const AiSettingsCoreAdminView = async () => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
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
