import { TranslationsProvider } from '@/components/translations-provider';
import { HeaderContent } from '@/components/ui/header-content';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { WarnReqRestartServer } from '../plugins/warn-req-restart-server';
import { ActionsDiagnosticTools } from './actions/actions';

const permission = {
  plugin_code: 'core',
  group: 'dashboard',
  permission: 'can_manage_diagnostic_tools',
};

export const generateMetadataDiagnosticAdmin = async (): Promise<Metadata> => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin.core.diagnostic');

  return {
    title: t('title'),
  };
};

export const DiagnosticToolsView = async () => {
  const perm = await checkAdminPermissionPage(permission); // [!code highlight]
  if (perm) return perm;
  const t = await getTranslations('admin.core.diagnostic');

  return (
    <TranslationsProvider namespaces="admin.core.diagnostic">
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <ActionsDiagnosticTools />
      </HeaderContent>

      <WarnReqRestartServer />
    </TranslationsProvider>
  );
};
