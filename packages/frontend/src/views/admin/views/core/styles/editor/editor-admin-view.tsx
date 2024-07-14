import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { ContentEditorAdmin } from './content';
import { HeaderContent } from '@/components/ui/header-content';
import { getGlobalData } from '@/graphql/get-global-data';

export const generateMetadataEditorAdmin = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.core.styles.editor');

  return {
    title: t('title'),
  };
};

export const EditorAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.styles.editor'),
    getGlobalData(),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} />
      <ContentEditorAdmin {...data.core_middleware__show.editor} />
    </>
  );
};
