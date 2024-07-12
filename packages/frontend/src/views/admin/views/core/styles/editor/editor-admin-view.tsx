import { getTranslations } from 'next-intl/server';

import { ContentEditorAdmin } from './content';
import { HeaderContent } from '@/components/ui/header-content';
import { getGlobalData } from '@/graphql/get-global-data';

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
