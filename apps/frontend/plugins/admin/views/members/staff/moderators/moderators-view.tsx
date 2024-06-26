import { useTranslations } from 'next-intl';
import { Card } from 'vitnode-frontend/components/ui/card';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';

import { Admin__Core_Staff_Moderators__ShowQuery } from '@/graphql/hooks';
import { TableModeratorsStaffAdmin } from './table/table';
import { ActionsModeratorsStaffAdmin } from './actions/actions';

export interface ModeratorsStaffAdminViewProps {
  data: Admin__Core_Staff_Moderators__ShowQuery;
}

export const ModeratorsStaffAdminView = (
  props: ModeratorsStaffAdminViewProps,
) => {
  const t = useTranslations('admin.members.staff.moderators');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsModeratorsStaffAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableModeratorsStaffAdmin {...props} />
      </Card>
    </>
  );
};
