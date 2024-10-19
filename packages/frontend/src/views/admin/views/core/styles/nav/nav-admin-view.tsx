import { TranslationsProvider } from '@/components/translations-provider';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import {
  Admin__Core_Nav__Show,
  Admin__Core_Nav__ShowQuery,
  Admin__Core_Nav__ShowQueryVariables,
} from '@/graphql/queries/admin/styles/nav/admin__core_nav__show.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { ActionsNavAdmin } from './actions/actions';
import { TableNavAdmin } from './table/table';

const getData = async () => {
  const data = await fetcher<
    Admin__Core_Nav__ShowQuery,
    Admin__Core_Nav__ShowQueryVariables
  >({
    query: Admin__Core_Nav__Show,
    cache: 'force-cache',
  });

  return data;
};

const permission = {
  plugin_code: 'core',
  group: 'styles',
  permission: 'can_manage_styles_nav',
};

export const generateMetadataNavAdmin = async (): Promise<Metadata> => {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const t = await getTranslations('admin.core.styles.nav');

  return {
    title: t('title'),
  };
};

export const NavAdminView = async () => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const [data, t] = await Promise.all([
    getData(),
    getTranslations('admin.core.styles.nav'),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.styles.nav">
      <HeaderContent h1={t('title')}>
        <ActionsNavAdmin />
      </HeaderContent>

      <TableNavAdmin {...data} />
    </TranslationsProvider>
  );
};
