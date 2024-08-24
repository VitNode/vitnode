import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Admin__Core_Staff_Moderators__Show,
  Admin__Core_Staff_Moderators__ShowQuery,
  Admin__Core_Staff_Moderators__ShowQueryVariables,
} from '@/graphql/queries/admin/members/staff/admin__core_staff_moderators__show.generated';
import { ShowAdminStaffModeratorsSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ActionsModeratorsStaffAdmin } from './actions/actions';
import { TableModeratorsStaffAdmin } from './table/table';

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

export const generateMetadataModeratorsStaffAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.staff.moderators');

    return {
      title: t('title'),
    };
  };

export const ModeratorsStaffAdminView = async ({
  searchParams,
}: ModeratorsStaffAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
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
