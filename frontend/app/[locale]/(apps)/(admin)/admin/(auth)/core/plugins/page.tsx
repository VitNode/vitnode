import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import { PluginsCoreAdminView } from "@/admin/core/views/core/plugins/plugins-admin-view";
import {
  Core_Plugins__Admin__Show,
  ShowAdminPluginsSortingColumnEnum,
  type Core_Plugins__Admin__ShowQuery,
  type Core_Plugins__Admin__ShowQueryVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from "@/hooks/core/utils/use-pagination-api-ssr";

interface Props {
  params: {
    locale: string;
  };
  searchParams: SearchParamsPagination;
}

const getData = async (variables: Core_Plugins__Admin__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Plugins__Admin__ShowQuery,
    Core_Plugins__Admin__ShowQueryVariables
  >({
    query: Core_Plugins__Admin__Show,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "admin.core.styles.themes"
  });

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    // search: true,
    sortByEnum: ShowAdminPluginsSortingColumnEnum,
    defaultPageSize: 10
  });
  const data = await getData(variables);

  return <PluginsCoreAdminView {...data} />;
}
