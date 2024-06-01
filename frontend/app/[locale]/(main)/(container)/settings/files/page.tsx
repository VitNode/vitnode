import * as React from "react";

import { getSessionData } from "@/functions/get-session-data";
import {
  Core_Members__Files__Show,
  ShowCoreFilesSortingColumnEnum,
  Core_Members__Files__ShowQuery,
  Core_Members__Files__ShowQueryVariables
} from "@/utils/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { fetcher } from "@/utils/graphql/fetcher";

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
  const [{ theme_id }, data] = await Promise.all([
    getSessionData(),
    getData(variables)
  ]);

  const PageFromTheme: React.LazyExoticComponent<
    (props: Core_Members__Files__ShowQuery) => JSX.Element
  > = React.lazy(async () =>
    import(
      `@/themes/${theme_id}/core/views/settings/views/files/files-settings-view`
    ).catch(
      async () =>
        import("@/themes/1/core/views/settings/views/files/files-settings-view")
    )
  );

  return <PageFromTheme {...data} />;
}
