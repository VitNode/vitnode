import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  Admin__Core_Plugins__Show,
  ShowAdminPluginsSortingColumnEnum,
  Admin__Core_Plugins__ShowQuery,
  Admin__Core_Plugins__ShowQueryVariables
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import { fetcher } from "@/graphql/fetcher";
import { RebuildRequiredAdmin } from "@/plugins/admin/global/rebuild-required";
import { ActionsPluginsAdmin } from "@/plugins/admin/views/core/plugins/actions/actions";
import { PluginsCoreAdminView } from "@/plugins/admin/views/core/plugins/plugins-admin-view";

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
  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations("admin.core.plugins")
  ]);

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsPluginsAdmin />
      </HeaderContent>

      <Card className="p-6">
        <RebuildRequiredAdmin />

        <PluginsCoreAdminView {...data} />
      </Card>
    </>
  );
}
