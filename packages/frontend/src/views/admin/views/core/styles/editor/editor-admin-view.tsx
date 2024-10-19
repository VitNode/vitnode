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

import { ContentEditorAdmin } from './content';

const permission = {
  plugin_code: 'core',
  group: 'styles',
  permission: 'can_manage_styles_editor',
};

export const generateMetadataEditorAdmin = async (): Promise<Metadata> => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin.core.styles.editor');

  return {
    title: t('title'),
  };
};

export const EditorAdminView = async () => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const [t, data] = await Promise.all([
    getTranslations('admin.core.styles.editor'),
    getGlobalData(),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.styles.editor">
      <HeaderContent h1={t('title')} />

      <Card className="p-6">
        <ContentEditorAdmin {...data.core_middleware__show.editor} />
      </Card>
    </TranslationsProvider>
  );
};
