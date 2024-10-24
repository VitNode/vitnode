import { TranslationsProvider } from '@/components/translations-provider';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import {
  Admin__Core_Languages__Show,
  Admin__Core_Languages__ShowQuery,
  Admin__Core_Languages__ShowQueryVariables,
} from '@/graphql/queries/admin/languages/admin__core_languages__show.generated';
import { ShowCoreLanguagesSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ActionsLangsAdmin } from './actions/actions';
import { ContentLangsCoreAdminView } from './content';

const getData = async (
  variables: Admin__Core_Languages__ShowQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Languages__ShowQuery,
    Admin__Core_Languages__ShowQueryVariables
  >({
    query: Admin__Core_Languages__Show,
    variables,
    cache: 'force-cache',
  });

  return data;
};

interface Props {
  searchParams: Promise<SearchParamsPagination>;
}

const permission = {
  plugin_code: 'core',
  group: 'can_manage_langs',
  permission: '',
};

export const generateMetadataLangsCoreAdmin = async (): Promise<Metadata> => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin.core.langs');

  return {
    title: t('title'),
  };
};

export const LangsCoreAdminView = async ({ searchParams }: Props) => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const variables = await getPaginationTool({
    searchParams,
    defaultPageSize: 10,
    sortByEnum: ShowCoreLanguagesSortingColumnEnum,
  });

  const [t, data] = await Promise.all([
    getTranslations('admin.core.langs'),
    getData(variables),
  ]);

  return (
    <TranslationsProvider namespaces={['admin.core.langs']}>
      <HeaderContent h1={t('title')}>
        <ActionsLangsAdmin />
      </HeaderContent>

      <ContentLangsCoreAdminView {...data} />
    </TranslationsProvider>
  );
};
