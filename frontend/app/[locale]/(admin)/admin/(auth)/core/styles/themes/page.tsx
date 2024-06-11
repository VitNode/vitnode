import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  Admin_Core_Themes__Show,
  ShowAdminThemesSortingColumnEnum,
  Admin_Core_Themes__ShowQuery,
  Admin_Core_Themes__ShowQueryVariables
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { fetcher } from "@/graphql/fetcher";
import { ThemesAdminView } from "@/plugins/admin/views/core/styles/themes/themes-admin-view";

interface Props {
  searchParams: SearchParamsPagination;
}

const getData = async (variables: Admin_Core_Themes__ShowQueryVariables) => {
  const { data } = await fetcher<
    Admin_Core_Themes__ShowQuery,
    Admin_Core_Themes__ShowQueryVariables
  >({
    query: Admin_Core_Themes__Show,
    variables
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.styles.themes");

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    // search: true,
    sortByEnum: ShowAdminThemesSortingColumnEnum,
    defaultPageSize: 10
  });
  const data = await getData(variables);

  return <ThemesAdminView {...data} />;
}
