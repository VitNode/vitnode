import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  Core_Languages__Show,
  ShowCoreLanguagesSortingColumnEnum,
  Core_Languages__ShowQuery,
  Core_Languages__ShowQueryVariables
} from "@/utils/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import { fetcher } from "@/utils/graphql/fetcher";
import { ActionsLangsAdmin } from "@/plugins/core/admin/views/core/langs/actions/actions";
import { RebuildRequiredAdmin } from "@/plugins/core/admin/global/rebuild-required";
import { LangsCoreAdminView } from "@/plugins/core/admin/views/core/langs/langs-core-admin-view";

const getData = async (variables: Core_Languages__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Languages__ShowQuery,
    Core_Languages__ShowQueryVariables
  >({
    query: Core_Languages__Show,
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.langs");

  return {
    title: t("title")
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    defaultPageSize: 10,
    search: true,
    sortByEnum: ShowCoreLanguagesSortingColumnEnum
  });

  const [t, data] = await Promise.all([
    getTranslations("admin.core.langs"),
    getData(variables)
  ]);

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsLangsAdmin />
      </HeaderContent>

      <Card className="p-6">
        <RebuildRequiredAdmin />
        <LangsCoreAdminView data={data} />
      </Card>
    </>
  );
}
