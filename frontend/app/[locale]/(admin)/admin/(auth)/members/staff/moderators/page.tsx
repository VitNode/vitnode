import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  Admin__Core_Staff_Moderators__Show,
  ShowAdminStaffModeratorsSortingColumnEnum,
  Admin__Core_Staff_Moderators__ShowQuery,
  Admin__Core_Staff_Moderators__ShowQueryVariables
} from "@/utils/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { fetcher } from "@/utils/graphql/fetcher";
import { ModeratorsStaffAdminView } from "@/plugins/core/admin/views/members/staff/views/moderators/moderators-view";

const getData = async (
  variables: Admin__Core_Staff_Moderators__ShowQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Staff_Moderators__ShowQuery,
    Admin__Core_Staff_Moderators__ShowQueryVariables
  >({
    query: Admin__Core_Staff_Moderators__Show,
    variables
  });

  return data;
};

interface Props {
  searchParams: SearchParamsPagination;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.members.staff.moderators");

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    search: true,
    sortByEnum: ShowAdminStaffModeratorsSortingColumnEnum,
    defaultPageSize: 10
  });

  const data = await getData(variables);

  return <ModeratorsStaffAdminView data={data} />;
}
