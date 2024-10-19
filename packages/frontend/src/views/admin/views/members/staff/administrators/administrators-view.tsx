import { TranslationsProvider } from '@/components/translations-provider';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import { getGlobalData } from '@/graphql/get-global-data';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Admin__Core_Staff_Administrators__Show,
  Admin__Core_Staff_Administrators__ShowQuery,
  Admin__Core_Staff_Administrators__ShowQueryVariables,
} from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { ShowAdminStaffAdministratorsSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ActionsAdministratorsStaffAdmin } from './actions/actions';
import { TableAdministratorsStaffAdmin } from './table/table';

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

export const generateMetadataAdministratorsStaffAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.staff.administrators');

    return {
      title: t('title'),
    };
  };

export const AdministratorsStaffAdminView = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPagination>;
}) => {
  const variables = await getPaginationTool({
    searchParams,
    sortByEnum: ShowAdminStaffAdministratorsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const [data, t, global] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.staff.administrators'),
    getGlobalData(),
  ]);

  return (
    <TranslationsProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      namespaces={[
        'admin.members.staff.administrators',
        'admin.members.staff.shared',
        'admin_core.admin_permissions',
        'admin_members.admin_permissions',
        ...global.core_plugins__show.map(
          plugin => `admin_${plugin.code}.admin_permissions`,
        ),
      ]}
    >
      <HeaderContent h1={t('title')}>
        <ActionsAdministratorsStaffAdmin
          permissions={data.admin__core_staff_administrators__show.permissions}
        />
      </HeaderContent>

      <TableAdministratorsStaffAdmin {...data} />
    </TranslationsProvider>
  );
};
