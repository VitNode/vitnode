import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Card } from "vitnode-frontend/components";

import { HeaderContent } from "@/components/header-content/header-content";
import {
  Admin__Core_Files__Show,
  ShowCoreFilesSortingColumnEnum,
  Admin__Core_Files__ShowQuery,
  Admin__Core_Files__ShowQueryVariables,
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination,
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { fetcher } from "@/graphql/fetcher";
import { FilesAdvancedCoreAdminView } from "@/plugins/admin/views/core/advanced/files/files-advanced-core-admin-view";

const getData = async (variables: Admin__Core_Files__ShowQueryVariables) => {
  const { data } = await fetcher<
    Admin__Core_Files__ShowQuery,
    Admin__Core_Files__ShowQueryVariables
  >({
    query: Admin__Core_Files__Show,
    variables,
  });

  return data;
};

interface Props {
  searchParams: SearchParamsPagination;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.advanced.files");

  return {
    title: t("title"),
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    defaultPageSize: 10,
    search: true,
    sortByEnum: ShowCoreFilesSortingColumnEnum,
  });
  const [t, data] = await Promise.all([
    getTranslations("admin.core.advanced.files"),
    getData(variables),
  ]);

  return (
    <>
      <HeaderContent h1={t("title")} />

      <Card className="p-6">
        <FilesAdvancedCoreAdminView {...data} />
      </Card>
    </>
  );
}
