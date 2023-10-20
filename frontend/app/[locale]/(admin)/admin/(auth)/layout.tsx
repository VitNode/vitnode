import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getTranslator } from 'next-intl/server';
import { Metadata } from 'next';

import { AdminLayout } from '@/admin/layout/admin-layout';
import { SessionAdminProvider } from '../session-admin-provider';
import { redirect } from '@/i18n';
import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Admin_Sessions,
  Authorization_Admin_SessionsQuery,
  Authorization_Admin_SessionsQueryVariables
} from '@/graphql/hooks';

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
  const t = await getTranslator(locale, 'core');
  const tAdmin = await getTranslator(locale, 'admin');

  try {
    const data = await getData();
    if (!data) {
      return {
        title: `${t('errors.no_connection_api')} - ${tAdmin('title_short')}`
      };
    }
    const defaultTitle = `${tAdmin('title_short')} - ${
      data.authorization_admin_sessions.side_name
    }`;

    return {
      title: {
        default: defaultTitle,
        template: `%s - ${defaultTitle}`
      }
    };
  } catch (error) {
    return {
      title: t('errors.no_connection_api')
    };
  }
}

export default async function Layout({ children }: Props) {
  try {
    const initialDataSession = await getData();

    return (
      <SessionAdminProvider initialDataSession={initialDataSession}>
        <AdminLayout>{children}</AdminLayout>
      </SessionAdminProvider>
    );
  } catch (error) {
    redirect('/admin');
  }
}
