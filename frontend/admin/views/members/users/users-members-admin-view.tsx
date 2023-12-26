import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableUsersMembersAdmin } from './table/table';
import type { Core_Members__Admin__ShowQuery } from '@/graphql/hooks';

export interface UsersMembersAdminViewProps {
  data: Core_Members__Admin__ShowQuery;
}

export const UsersMembersAdminView = (props: UsersMembersAdminViewProps) => {
  const t = useTranslations('admin.members.users');

  return (
    <>
      <HeaderContent h1={t('title')} />
      <TableUsersMembersAdmin {...props} />
    </>
  );
};
