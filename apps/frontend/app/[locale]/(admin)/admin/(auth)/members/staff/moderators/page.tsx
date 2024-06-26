import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetcher } from "vitnode-frontend/graphql/fetcher";

import {
  Admin__Core_Staff_Moderators__Show,
  ShowAdminStaffModeratorsSortingColumnEnum,
  Admin__Core_Staff_Moderators__ShowQuery,
  Admin__Core_Staff_Moderators__ShowQueryVariables,
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination,
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { ModeratorsStaffAdminView } from "@/plugins/admin/views/members/staff/moderators/moderators-view";

const getData = async (
  variables: Admin__Core_Staff_Moderators__ShowQueryVariables,
) => {
  const { data } = await fetcher<
    Admin__Core_Staff_Moderators__ShowQuery,
    Admin__Core_Staff_Moderators__ShowQueryVariables
  >({
    query: Admin__Core_Staff_Moderators__Show,
    variables,
  });

  return data;
};

interface Props {
  searchParams: SearchParamsPagination;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.members.staff.moderators");

  return {
    title: t("title"),
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    search: true,
    sortByEnum: ShowAdminStaffModeratorsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const data = await getData(variables);

  return <ModeratorsStaffAdminView data={data} />;
}
