import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableContentNavAdmin } from './table/table';

export const NavAdminView = () => {
  const t = useTranslations('admin.core.styles.nav');

  return (
    <>
      <HeaderContent h1={t('title')} />

      <TableContentNavAdmin />
    </>
  );
};
