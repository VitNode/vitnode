import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ModeratorsStaffAdminView } from "@/admin/core/views/members/staff/views/moderators/moderators-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Staff_Moderators__Show,
  ShowAdminStaffModeratorsSortingColumnEnum,
  type Admin__Core_Staff_Moderators__ShowQuery,
  type Admin__Core_Staff_Moderators__ShowQueryVariables
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from "@/hooks/core/utils/use-pagination-api-ssr";

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
  params: {
    locale: string;
  };
  searchParams: SearchParamsPagination;
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "admin.members.staff.moderators"
  });

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
