import { TranslationsProvider } from '@/components/translations-provider';
import { fetcher } from '@/graphql/fetcher';
import { getSessionAdminData } from '@/graphql/get-session-admin-data';
import {
  Core_Theme_Editor__Show,
  Core_Theme_Editor__ShowQuery,
  Core_Theme_Editor__ShowQueryVariables,
} from '@/graphql/queries/admin/theme_editor/core_theme_editor__show.generated';
import { redirect } from '@/navigation';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

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

export const generateMetadataThemeEditor = async (): Promise<Metadata> => {
  const t = await getTranslations('admin_core.nav');

  return {
    title: t('styles_theme-editor'),
  };
};

export const ThemeEditorView = async () => {
  const locale = await getLocale();

  try {
    const [data, session] = await Promise.all([
      getData(),
      getSessionAdminData(),
    ]);

    if (!session.admin__sessions__authorization.user) {
      redirect({ href: '/admin', locale });
    }

    return (
      <TranslationsProvider namespaces={['admin.theme_editor', 'admin.global']}>
        <ContentThemeEditor {...data} />
      </TranslationsProvider>
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'ACCESS_DENIED') {
      redirect({ href: '/admin', locale });
    }

    throw err;
  }
};
