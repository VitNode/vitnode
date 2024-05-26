import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import { UsersMembersAdminView } from "@/admin/core/views/members/users/users-members-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Members__Show,
  ShowAdminMembersSortingColumnEnum,
  Admin__Core_Members__ShowQuery,
  Admin__Core_Members__ShowQueryVariables
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/hooks/core/utils/use-pagination-api-ssr";

interface SearchParams extends SearchParamsPagination {
  groups?: string[];
}

interface Props {
  searchParams: SearchParams;
}

const getData = async (variables: Admin__Core_Members__ShowQueryVariables) => {
  const { data } = await fetcher<
    Admin__Core_Members__ShowQuery,
    Admin__Core_Members__ShowQueryVariables
  >({
    query: Admin__Core_Members__Show,
    variables
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.members.users");

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables: Admin__Core_Members__ShowQueryVariables = {
    ...usePaginationAPISsr({
      searchParams,
      sortByEnum: ShowAdminMembersSortingColumnEnum,
      search: true,
      defaultPageSize: 10
    }),
    groups: Array.isArray(searchParams.groups)
      ? searchParams.groups?.map(group => Number(group))
      : Number(searchParams.groups)
  };
  const data = await getData(variables);

  return <UsersMembersAdminView data={data} />;
}
