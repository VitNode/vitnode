import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { ActionsGroupsMembersAdmin } from './actions/actions-groups-members-admin';
import type { Core_Groups__Admin__ShowQuery } from '@/graphql/hooks';
import { TableGroupsMembersAdmin } from './table/table-groups-members-admin';

export interface GroupsMembersAdminViewProps {
  data: Core_Groups__Admin__ShowQuery;
}

export const GroupsMembersAdminView = (props: GroupsMembersAdminViewProps) => {
  const t = useTranslations('admin.members.groups');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsGroupsMembersAdmin />
      </HeaderContent>

      <TableGroupsMembersAdmin {...props} />
    </>
  );
};
