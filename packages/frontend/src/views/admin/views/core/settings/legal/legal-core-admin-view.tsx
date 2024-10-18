import { TranslationsProvider } from '@/components/translations-provider';
import { Button } from '@/components/ui/button';
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
  Admin_Core_Terms__Show,
  Admin_Core_Terms__ShowQuery,
  Admin_Core_Terms__ShowQueryVariables,
} from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { Link } from '@/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';
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
  });

  return data;
};

const permission = {
  plugin_code: 'core',
  group: 'settings',
  permission: 'can_manage_settings_legal',
};

export const generateMetadataLegalSettingsAdmin = async () => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin.core.settings.legal');

  return {
    title: t('title'),
  };
};

export const LegalSettingsAdminView = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPagination>;
}) => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const variables = await getPaginationTool({
    searchParams,
    defaultPageSize: 10,
  });
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.legal'),
    getData(variables),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.settings.legal">
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <Button asChild variant="ghost">
          <Link href="/legal" target="_blank">
            {t('legal_public')} <SquareArrowOutUpRight />
          </Link>
        </Button>
        <CreateLegalSettingsAdmin />
      </HeaderContent>

      <ContentLegalSettingsAdmin {...data} />
    </TranslationsProvider>
  );
};
