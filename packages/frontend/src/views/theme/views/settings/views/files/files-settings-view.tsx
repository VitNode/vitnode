import { CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Progress } from '@/components/ui/progress';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import { getSessionData } from '@/graphql/get-session-data';
import {
  Core_Members__Files__Show,
  Core_Members__Files__ShowQuery,
  Core_Members__Files__ShowQueryVariables,
} from '@/graphql/queries/settings/core_members__files__show.generated';
import { ShowCoreFilesSortingColumnEnum } from '@/graphql/types';
import { cn } from '@/helpers/classnames';
import { formatBytes } from '@/helpers/format-bytes';
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
  });

  return data;
};

const ContentFilesSettings = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentFilesSettings,
  })),
);

export const generateMetadataFilesSettings = async (): Promise<Metadata> => {
  const t = await getTranslations('core.settings.files');

  return {
    title: t('title'),
    description: t('desc'),
  };
};

export const FilesSettingsView = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPagination>;
}) => {
  const variables = await getPaginationTool({
    searchParams,
    defaultPageSize: 10,
    sortByEnum: ShowCoreFilesSortingColumnEnum,
  });
  const [t, data, { core_sessions__authorization }] = await Promise.all([
    getTranslations('core.settings.files'),
    getData(variables),
    getSessionData(),
  ]);
  if (!core_sessions__authorization.user) {
    return null;
  }
  const {
    user: { files_permissions },
  } = core_sessions__authorization;
  const percentStorage =
    (files_permissions.space_used / files_permissions.total_max_storage) * 100;

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t('title')}
        </h1>
        <CardDescription>{t('desc')}</CardDescription>
      </CardHeader>

      <CardContent>
        {files_permissions.total_max_storage > 0 && (
          <div className="mb-6 space-y-2">
            <Progress
              className={cn({
                '[&>div]:bg-destructive': percentStorage > 85,
              })}
              value={percentStorage}
            />
            <div className="text-muted-foreground text-center text-sm">
              {t.rich('storage_usage', {
                used: formatBytes(files_permissions.space_used),
                total: formatBytes(files_permissions.total_max_storage),
                percent: Math.round(percentStorage),
              })}
            </div>
          </div>
        )}
        <React.Suspense fallback={<Loader />}>
          <ContentFilesSettings {...data} />
        </React.Suspense>
      </CardContent>
    </>
  );
};
