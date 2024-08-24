import { CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Core_Members__Files__Show,
  Core_Members__Files__ShowQuery,
  Core_Members__Files__ShowQueryVariables,
} from '@/graphql/queries/settings/core_members__files__show.generated';
import { ShowCoreFilesSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const getData = async (variables: Core_Members__Files__ShowQueryVariables) => {
  const data = await fetcher<
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

export const generateMetadataFilesSettings = async (): Promise<Metadata> => {
  const t = await getTranslations('core.settings.files');

  return {
    title: t('title'),
    description: t('desc'),
  };
};

export const FilesSettingsView = async ({
  searchParams,
}: FilesSettingsViewProps) => {
  const t = await getTranslations('core.settings.files');
  const variables = getPaginationTool({
    searchParams,
    defaultPageSize: 10,
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
