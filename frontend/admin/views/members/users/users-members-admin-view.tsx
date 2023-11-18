import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableUsersMembersAdmin } from './table/table-users-members-admin';

export const UsersMembersAdminView = () => {
  const t = useTranslations('admin.members.users');

  return (
    <>
      <HeaderContent h1={t('title')} />
      <TableUsersMembersAdmin />
    </>
  );
};
