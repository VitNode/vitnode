import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import type { Core_Staff_Administrators__Admin__ShowQuery } from '@/graphql/hooks';
import { TableAdministratorsStaffAdmin } from './table/table';

export interface AdministratorsStaffAdminViewProps {
  data: Core_Staff_Administrators__Admin__ShowQuery;
}

export const AdministratorsStaffAdminView = (props: AdministratorsStaffAdminViewProps) => {
  const t = useTranslations('admin.members.staff.administrators');

  return (
    <>
      <HeaderContent h1={t('title')} />
      <TableAdministratorsStaffAdmin {...props} />
    </>
  );
};
