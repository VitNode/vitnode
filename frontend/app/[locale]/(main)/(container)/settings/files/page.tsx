import { lazy, LazyExoticComponent } from "react";

import { getSessionData } from "@/functions/get-session-data";
import {
  Core_Members__Files__Show,
  ShowCoreFilesSortingColumnEnum,
  Core_Members__Files__ShowQuery,
  Core_Members__Files__ShowQueryVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/hooks/core/utils/use-pagination-api-ssr";

const getData = async (variables: Core_Members__Files__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Members__Files__ShowQuery,
    Core_Members__Files__ShowQueryVariables
  >({
    query: Core_Members__Files__Show,
    variables
  });

  return data;
};

interface Props {
  searchParams: SearchParamsPagination;
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    defaultPageSize: 10,
    search: true,
    sortByEnum: ShowCoreFilesSortingColumnEnum
  });
  const { theme_id } = await getSessionData();
  const data = await getData(variables);

  const PageFromTheme: LazyExoticComponent<
    (props: Core_Members__Files__ShowQuery) => JSX.Element
  > = lazy(async () =>
    import(
      `@/themes/${theme_id}/core/views/settings/views/files/files-settings-view`
    ).catch(
      async () =>
        import("@/themes/1/core/views/settings/views/files/files-settings-view")
    )
  );

  return <PageFromTheme {...data} />;
}
