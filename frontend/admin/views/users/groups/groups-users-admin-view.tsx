import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableGroupsUsersAdmin } from './table/table-groups-users-admin';

export const GroupsUsersAdminView = () => {
  const t = useTranslations('admin');

  return (
    <>
      <HeaderContent h1={t('users.groups.title')} desc={t('users.groups.desc')} />

      <TableGroupsUsersAdmin />
    </>
  );
};
