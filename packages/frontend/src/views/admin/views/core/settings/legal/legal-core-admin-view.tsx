import { Card, CardContent } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Core_Terms__Show,
  Core_Terms__ShowQuery,
  Core_Terms__ShowQueryVariables,
} from '@/graphql/queries/terms/core_terms__show.generated';
import { getTranslations } from 'next-intl/server';

import { ContentLegalSettingsAdmin } from './content';
import { CreateLegalPage } from './create/create';

const getData = async (variables: Core_Terms__ShowQueryVariables) => {
  const data = await fetcher<
    Core_Terms__ShowQuery,
    Core_Terms__ShowQueryVariables
  >({
    query: Core_Terms__Show,
    variables,
    cache: 'force-cache',
  });

  return data;
};

export const generateMetadataLegalSettingsAdmin = async () => {
  const t = await getTranslations('admin.core.settings.legal');

  return {
    title: t('title'),
  };
};

export const LegalSettingsAdminView = async ({
  searchParams,
}: {
  searchParams: SearchParamsPagination;
}) => {
  const variables = getPaginationTool({
    searchParams,
    defaultPageSize: 10,
  });

  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.legal'),
    getData(variables),
  ]);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <CreateLegalPage />
      </HeaderContent>

      <Card>
        <CardContent className="p-6">
          <ContentLegalSettingsAdmin {...data} />
        </CardContent>
      </Card>
    </>
  );
};
