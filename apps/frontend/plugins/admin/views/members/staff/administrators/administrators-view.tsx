import { useTranslations } from 'next-intl';
import { Card } from 'vitnode-frontend/components/ui/card';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';

import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/hooks';
import { TableAdministratorsStaffAdmin } from './table/table';
import { ActionsAdministratorsStaffAdmin } from './actions/actions';

export interface AdministratorsStaffAdminViewProps {
  data: Admin__Core_Staff_Administrators__ShowQuery;
}

export const AdministratorsStaffAdminView = (
  props: AdministratorsStaffAdminViewProps,
) => {
  const t = useTranslations('admin.members.staff.administrators');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsAdministratorsStaffAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableAdministratorsStaffAdmin {...props} />
      </Card>
    </>
  );
};
