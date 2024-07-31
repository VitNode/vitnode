import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { ActionsLangsAdmin } from './actions/actions';
import { ContentLangsCoreAdminView } from './content';
import {
  Admin__Core_Languages__Show,
  Admin__Core_Languages__ShowQuery,
  Admin__Core_Languages__ShowQueryVariables,
  ShowCoreLanguagesSortingColumnEnum,
} from '@/graphql/graphql';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import { fetcher } from '@/graphql/fetcher';

import { RebuildRequiredAdmin } from '../../../global/rebuild-required';

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

export interface LangsCoreAdminViewProps {
  params: {
    locale: string;
  };
  searchParams: SearchParamsPagination;
}

export const generateMetadataLangsCoreAdmin = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.core.langs');

  return {
    title: t('title'),
  };
};

export const LangsCoreAdminView = async ({
  searchParams,
}: LangsCoreAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
    defaultPageSize: 10,
    search: true,
    sortByEnum: ShowCoreLanguagesSortingColumnEnum,
  });

  const [t, data] = await Promise.all([
    getTranslations('admin.core.langs'),
    getData(variables),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsLangsAdmin />
      </HeaderContent>

      <Card className="p-6">
        <RebuildRequiredAdmin />
        <ContentLangsCoreAdminView {...data} />
      </Card>
    </>
  );
};
