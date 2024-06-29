import * as React from 'react';
import { getTranslations } from 'next-intl/server';

import { fetcher } from '../../../../../../graphql/fetcher';
import {
  Core_Members__Files__Show,
  Core_Members__Files__ShowQuery,
  Core_Members__Files__ShowQueryVariables,
  ShowCoreFilesSortingColumnEnum,
} from '../../../../../../graphql/graphql';
import {
  CardContent,
  CardDescription,
  CardHeader,
} from '../../../../../../components/ui/card';
import { Loader } from '../../../../../../components/ui/loader';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '../../../../../../graphql/get-pagination-tool';

const getData = async (variables: Core_Members__Files__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Members__Files__ShowQuery,
    Core_Members__Files__ShowQueryVariables
  >({
    query: Core_Members__Files__Show,
    variables,
    cache: 'force-cache',
  });

  return data;
};

const ContentFilesSettings = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentFilesSettings,
  })),
);

export interface FilesSettingsViewProps {
  searchParams: SearchParamsPagination;
}

export const FilesSettingsView = async ({
  searchParams,
}: FilesSettingsViewProps) => {
  const t = await getTranslations('core.settings.files');
  const variables = getPaginationTool({
    searchParams,
    defaultPageSize: 10,
    search: true,
    sortByEnum: ShowCoreFilesSortingColumnEnum,
  });
  const data = await getData(variables);

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t('title')}
        </h1>
        <CardDescription>{t('desc')}</CardDescription>
      </CardHeader>

      <CardContent>
        <React.Suspense fallback={<Loader />}>
          <ContentFilesSettings {...data} />
        </React.Suspense>
      </CardContent>
    </>
  );
};
