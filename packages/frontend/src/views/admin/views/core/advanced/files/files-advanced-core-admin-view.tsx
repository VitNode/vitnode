import { TranslationsProvider } from '@/components/translations-provider';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Admin__Core_Files__Show,
  Admin__Core_Files__ShowQuery,
  Admin__Core_Files__ShowQueryVariables,
} from '@/graphql/queries/admin/advanced/files/admin__core_files__show.generated';
import { ShowCoreFilesSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentFilesAdvancedCoreAdminView } from './content';

const getData = async (variables: Admin__Core_Files__ShowQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Files__ShowQuery,
    Admin__Core_Files__ShowQueryVariables
  >({
    query: Admin__Core_Files__Show,
    variables,
  });

  return data;
};

export interface FilesAdvancedCoreAdminViewProps {
  searchParams: SearchParamsPagination;
}

export const generateMetadataFilesAdvancedCoreAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.core.advanced.files');

    return {
      title: t('title'),
    };
  };

export const FilesAdvancedCoreAdminView = async ({
  searchParams,
}: FilesAdvancedCoreAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
    defaultPageSize: 10,
    sortByEnum: ShowCoreFilesSortingColumnEnum,
  });

  const [t, data] = await Promise.all([
    getTranslations('admin.core.advanced.files'),
    getData(variables),
  ]);

  return (
    <TranslationsProvider
      namespaces={['admin.core.advanced.files', 'core.settings.files']}
    >
      <HeaderContent h1={t('title')} />

      <ContentFilesAdvancedCoreAdminView {...data} />
    </TranslationsProvider>
  );
};
