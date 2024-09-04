import { HeaderContent } from '@/components/ui/header-content';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import { getLegalData } from '@/views/theme/views/legal/legal-view';
import { getTranslations } from 'next-intl/server';

import { ContentLegalSettingsAdmin } from './content/content';
import { CreateLegalSettingsAdmin } from './create';

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
    getLegalData(variables),
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
