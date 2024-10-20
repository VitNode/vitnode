import { TranslationsProvider } from '@/components/translations-provider';
import { fetcher } from '@/graphql/fetcher';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
  getSessionAdminData,
} from '@/graphql/get-session-admin-data';
import {
  Core_Theme_Editor__Show,
  Core_Theme_Editor__ShowQuery,
  Core_Theme_Editor__ShowQueryVariables,
} from '@/graphql/queries/admin/theme_editor/core_theme_editor__show.generated';
import { redirect } from '@/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentThemeEditor } from './content';

const getData = async () => {
  const data = await fetcher<
    Core_Theme_Editor__ShowQuery,
    Core_Theme_Editor__ShowQueryVariables
  >({
    query: Core_Theme_Editor__Show,
    cache: 'force-cache',
  });

  return data;
};

const permission = {
  plugin_code: 'core',
  group: 'styles',
  permission: 'can_manage_styles_theme-editor',
};

export const generateMetadataThemeEditor = async (): Promise<Metadata> => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin_core.nav');

  return {
    title: t('styles_theme-editor'),
  };
};

export const ThemeEditorView = async () => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;

  try {
    const [data, session] = await Promise.all([
      getData(),
      getSessionAdminData(),
    ]);

    if (!session.admin__sessions__authorization.user) {
      await redirect('/admin');
    }

    return (
      <TranslationsProvider namespaces={['admin.theme_editor', 'admin.global']}>
        <ContentThemeEditor {...data} />
      </TranslationsProvider>
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'ACCESS_DENIED') {
      await redirect('/admin');
    }

    throw err;
  }
};
