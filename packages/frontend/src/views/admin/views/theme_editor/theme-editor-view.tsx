import { fetcher } from '@/graphql/fetcher';
import { getSessionAdminData } from '@/graphql/get-session-admin';
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
  try {
    const [data, session] = await Promise.all([
      getData(),
      getSessionAdminData(),
    ]);

    if (!session.admin__sessions__authorization.user) {
      redirect('/admin');
    }

    return <ContentThemeEditor {...data} />;
  } catch (err) {
    if (err instanceof Error && err.message === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    throw err;
  }
};
