import * as React from "react";

import {
  Core_Members__Files__Show,
  ShowCoreFilesSortingColumnEnum,
  Core_Members__Files__ShowQuery,
  Core_Members__Files__ShowQueryVariables
} from "@/graphql/hooks";
import {
  usePaginationAPISsr,
  SearchParamsPagination
} from "@/plugins/core/hooks/utils/use-pagination-api-ssr";
import { fetcher } from "@/graphql/fetcher";
import { FilesSettingsView } from "@/plugins/core/templates/views/settings/views/files/files-settings-view";

const getData = async (variables: Core_Members__Files__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Members__Files__ShowQuery,
    Core_Members__Files__ShowQueryVariables
  >({
    query: Core_Members__Files__Show,
    variables,
    cache: "force-cache"
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
  const data = await getData(variables);

  return <FilesSettingsView {...data} />;
}
