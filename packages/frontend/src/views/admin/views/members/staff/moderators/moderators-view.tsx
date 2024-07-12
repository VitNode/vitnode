import { getTranslations } from 'next-intl/server';

import { TableModeratorsStaffAdmin } from './table/table';
import { ActionsModeratorsStaffAdmin } from './actions/actions';
import {
  Admin__Core_Staff_Moderators__Show,
  Admin__Core_Staff_Moderators__ShowQuery,
  Admin__Core_Staff_Moderators__ShowQueryVariables,
  ShowAdminStaffModeratorsSortingColumnEnum,
} from '@/graphql/graphql';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import { fetcher } from '@/graphql/fetcher';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';

const getData = async (
  variables: Admin__Core_Staff_Moderators__ShowQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Staff_Moderators__ShowQuery,
    Admin__Core_Staff_Moderators__ShowQueryVariables
  >({
    query: Admin__Core_Staff_Moderators__Show,
    variables,
  });

  return data;
};

export interface ModeratorsStaffAdminViewProps {
  searchParams: SearchParamsPagination;
}

export const ModeratorsStaffAdminView = async ({
  searchParams,
}: ModeratorsStaffAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
    search: true,
    sortByEnum: ShowAdminStaffModeratorsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.staff.moderators'),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsModeratorsStaffAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableModeratorsStaffAdmin {...data} />
      </Card>
    </>
  );
};
