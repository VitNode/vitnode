import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PluginsCoreAdminView } from "@/admin/core/views/core/plugins/plugins-admin-view";
import {
  Admin__Core_Plugins__Show,
  ShowAdminPluginsSortingColumnEnum,
  Admin__Core_Plugins__ShowQuery,
  Admin__Core_Plugins__ShowQueryVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/hooks/core/utils/use-pagination-api-ssr";

interface Props {
  searchParams: SearchParamsPagination;
}

const getData = async (variables: Admin__Core_Plugins__ShowQueryVariables) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__ShowQuery,
    Admin__Core_Plugins__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Show,
    variables,
    next: {
      tags: ["Admin__Core_Plugins__Show"]
    }
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.plugins");

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    search: true,
    sortByEnum: ShowAdminPluginsSortingColumnEnum,
    defaultPageSize: 10
  });
  const data = await getData(variables);

  return <PluginsCoreAdminView {...data} />;
}
