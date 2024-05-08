import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LangsCoreAdminView } from "@/admin/core/views/core/langs/langs-core-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Languages__Show,
  ShowCoreLanguagesSortingColumnEnum,
  type Core_Languages__ShowQuery,
  type Core_Languages__ShowQueryVariables
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from "@/hooks/core/utils/use-pagination-api-ssr";

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

  const data = await getData(variables);

  return <LangsCoreAdminView data={data} />;
}
