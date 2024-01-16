import { useTranslations } from 'next-intl';

import corePackages from '@/package.json';
import { HeaderContent } from '@/components/header-content/header-content';

export const DashboardCoreAdminView = () => {
  const t = useTranslations('core');

  return (
    <>
      <HeaderContent h1="VitNode" desc={t('version', { version: corePackages.version })} />
    </>
  );
};
