import { useTranslations } from 'next-intl';
import { Card } from 'vitnode-frontend/components/ui/card';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableUsersMembersAdmin } from './table/table';
import { Admin__Core_Members__ShowQuery } from '@/graphql/hooks';

export interface UsersMembersAdminViewProps {
  data: Admin__Core_Members__ShowQuery;
}

export const UsersMembersAdminView = (props: UsersMembersAdminViewProps) => {
  const t = useTranslations('admin.members.users');

  return (
    <>
      <HeaderContent h1={t('title')} />

      <Card className="p-6">
        <TableUsersMembersAdmin {...props} />
      </Card>
    </>
  );
};
