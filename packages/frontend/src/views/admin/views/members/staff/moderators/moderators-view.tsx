import { TranslationsProvider } from '@/components/translations-provider';
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

export const generateMetadataModeratorsStaffAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.staff.moderators');

    return {
      title: t('title'),
    };
  };

export const ModeratorsStaffAdminView = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPagination>;
}) => {
  const variables = await getPaginationTool({
    searchParams,
    sortByEnum: ShowAdminStaffModeratorsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.staff.moderators'),
  ]);

  return (
    <TranslationsProvider
      namespaces={[
        'admin.members.staff.moderators',
        'admin.members.staff.shared',
      ]}
    >
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <ActionsModeratorsStaffAdmin />
      </HeaderContent>

      <TableModeratorsStaffAdmin {...data} />
    </TranslationsProvider>
  );
};
