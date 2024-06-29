import { getTranslations } from 'next-intl/server';

import { ContentEditorAdmin } from './content';

import { getConfigFile } from '../../../../../../helpers/config';
import { HeaderContent } from '../../../../../../components/ui/header-content';

export const EditorAdminView = async () => {
  const [data, t] = await Promise.all([
    getConfigFile(),
    getTranslations('admin.core.styles.editor'),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} />
      <ContentEditorAdmin {...data} />
    </>
  );
};
