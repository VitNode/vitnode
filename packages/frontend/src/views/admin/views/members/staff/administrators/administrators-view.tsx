import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { TableAdministratorsStaffAdmin } from './table/table';
import { ActionsAdministratorsStaffAdmin } from './actions/actions';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Staff_Administrators__Show,
  Admin__Core_Staff_Administrators__ShowQuery,
  Admin__Core_Staff_Administrators__ShowQueryVariables,
} from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { ShowAdminStaffAdministratorsSortingColumnEnum } from '@/graphql/types';

const getData = async (
  variables: Admin__Core_Staff_Administrators__ShowQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Staff_Administrators__ShowQuery,
    Admin__Core_Staff_Administrators__ShowQueryVariables
  >({
    query: Admin__Core_Staff_Administrators__Show,
    variables,
  });

  return data;
};

export interface AdministratorsStaffAdminViewProps {
  searchParams: SearchParamsPagination;
}

export const generateMetadataAdministratorsStaffAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.staff.administrators');

    return {
      title: t('title'),
    };
  };

export const AdministratorsStaffAdminView = async ({
  searchParams,
}: AdministratorsStaffAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
    sortByEnum: ShowAdminStaffAdministratorsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.staff.administrators'),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsAdministratorsStaffAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableAdministratorsStaffAdmin {...data} />
      </Card>
    </>
  );
};
