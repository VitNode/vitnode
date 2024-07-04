import { getTranslations } from 'next-intl/server';

import { ContentEditorAdmin } from './content';

import { HeaderContent } from '../../../../../../components/ui/header-content';

export const EditorAdminView = async () => {
  const [t] = await Promise.all([getTranslations('admin.core.styles.editor')]);

  return (
    <>
      <HeaderContent h1={t('title')} />
      <ContentEditorAdmin />
    </>
  );
};
