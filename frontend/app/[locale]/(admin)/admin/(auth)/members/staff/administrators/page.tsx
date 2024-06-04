import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  Admin__Core_Staff_Administrators__Show,
  ShowAdminStaffAdministratorsSortingColumnEnum,
  Admin__Core_Staff_Administrators__ShowQuery,
  Admin__Core_Staff_Administrators__ShowQueryVariables
} from "@/utils/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { fetcher } from "@/utils/graphql/fetcher";
import { AdministratorsStaffAdminView } from "@/plugins/admin/views/members/staff/administrators/administrators-view";

const getData = async (
  variables: Admin__Core_Staff_Administrators__ShowQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Staff_Administrators__ShowQuery,
    Admin__Core_Staff_Administrators__ShowQueryVariables
  >({
    query: Admin__Core_Staff_Administrators__Show,
    variables
  });

  return data;
};

interface Props {
  searchParams: SearchParamsPagination;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.members.staff.administrators");

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    search: true,
    sortByEnum: ShowAdminStaffAdministratorsSortingColumnEnum,
    defaultPageSize: 10
  });

  const data = await getData(variables);

  return <AdministratorsStaffAdminView data={data} />;
}
