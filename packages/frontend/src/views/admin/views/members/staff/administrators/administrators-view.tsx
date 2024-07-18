import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { TableAdministratorsStaffAdmin } from './table/table';
import { ActionsAdministratorsStaffAdmin } from './actions/actions';
import {
  Admin__Core_Staff_Administrators__Show,
  Admin__Core_Staff_Administrators__ShowQuery,
  Admin__Core_Staff_Administrators__ShowQueryVariables,
  ShowAdminStaffAdministratorsSortingColumnEnum,
} from '@/graphql/graphql';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';
import { fetcher } from '@/graphql/fetcher';

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

export const generateMetadataAdministratorsStaffAdminView =
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
    search: true,
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
