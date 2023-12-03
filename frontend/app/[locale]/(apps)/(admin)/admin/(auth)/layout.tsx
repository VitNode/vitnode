import configs from '~/config.json';

import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { AdminLayout } from '@/admin/layout/admin-layout';
import { SessionAdminProvider } from './session-admin-provider';
import { redirect } from '@/i18n';
import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Admin_Sessions,
  Authorization_Admin_SessionsQuery,
  Authorization_Admin_SessionsQueryVariables
} from '@/graphql/hooks';
import getQueryClient from '@/functions/get-query-client';
import { APIKeys } from '@/graphql/api-keys';

const getData = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get(CONFIG.admin.access_token) && !cookieStore.get(CONFIG.admin.refresh_token)) {
    return;
  }

  return await fetcher<
    Authorization_Admin_SessionsQuery,
    Authorization_Admin_SessionsQueryVariables
  >({
    query: Authorization_Admin_Sessions,
    headers: {
      Cookie: cookies().toString()
    }
  });
};

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin' });

  const defaultTitle = `${t('title_short')} - ${configs.side_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    }
  };
}

export default async function Layout({ children }: Props) {
  try {
    const queryClient = getQueryClient();
    const data = await getData();
    await queryClient.setQueryData([APIKeys.AUTHORIZATION_ADMIN], data);
    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <SessionAdminProvider>
          <AdminLayout>{children}</AdminLayout>
        </SessionAdminProvider>
      </HydrationBoundary>
    );
  } catch (error) {
    const errors = error as { errors: string[] };
    // eslint-disable-next-line no-console
    console.log(error, errors);

    redirect('/admin');
  }
}
