import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Admin_Core_Terms__Show,
  Admin_Core_Terms__ShowQuery,
  Admin_Core_Terms__ShowQueryVariables,
} from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { getTranslations } from 'next-intl/server';

import { ContentLegalSettingsAdmin } from './content/content';
import { CreateLegalSettingsAdmin } from './create';

export const getData = async (
  variables: Admin_Core_Terms__ShowQueryVariables,
) => {
  const data = await fetcher<
    Admin_Core_Terms__ShowQuery,
    Admin_Core_Terms__ShowQueryVariables
  >({
    query: Admin_Core_Terms__Show,
    variables,
    cache: 'force-cache',
    next: {
      tags: ['core_terms__show'],
    },
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
        <CreateLegalSettingsAdmin />
      </HeaderContent>

      <ContentLegalSettingsAdmin {...data} />
    </>
  );
};
