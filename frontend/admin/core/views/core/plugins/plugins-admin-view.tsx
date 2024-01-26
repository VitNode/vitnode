import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { TablePluginsAdmin } from './table/table';
import { ActionsPluginsAdmin } from './actions/actions';

export const PluginsCoreAdminView = () => {
  const t = useTranslations('admin.core.plugins');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsPluginsAdmin />
      </HeaderContent>

      <TablePluginsAdmin />
    </>
  );
};
