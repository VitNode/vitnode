import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';

export const PluginsCoreAdminView = () => {
  const t = useTranslations('admin.core.plugins');

  return (
    <>
      <HeaderContent h1={t('title')} />

      <div>PluginsCoreAdminView</div>
    </>
  );
};
