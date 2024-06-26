import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getConfigFile } from 'vitnode-frontend/helpers/config';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';

import { EditorAdminView } from '@/plugins/admin/views/core/styles/editor/editor-admin-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin.core.styles.editor');

  return {
    title: t('title'),
  };
}

export default async function Page() {
  const data = await getConfigFile();
  const t = await getTranslations('admin.core.styles.editor');

  return (
    <>
      <HeaderContent h1={t('title')} />
      <EditorAdminView data={data} />
    </>
  );
}
