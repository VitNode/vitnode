import { ReactNode } from 'react';
import { cookies } from 'next/headers';

import { AdminLayout } from '@/admin/layout/admin-layout';
import { SessionAdminProvider } from '../session-admin-provider';
import { redirect } from '@/i18n';
import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Authorization_Core_Sessions,
  Admin_Authorization_Core_SessionsQuery,
  Admin_Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';

const getSession = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get(CONFIG.admin.access_token) && !cookieStore.get(CONFIG.admin.refresh_token)) {
    return;
  }

  try {
    return await fetcher<
      Admin_Authorization_Core_SessionsQuery,
      Admin_Authorization_Core_SessionsQueryVariables
    >({
      query: Admin_Authorization_Core_Sessions,
      headers: {
        Cookie: cookies().toString()
      }
    });
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const initialDataSession = await getSession();

  if (!initialDataSession) {
    redirect('/admin');
  }

  return (
    <SessionAdminProvider initialDataSession={initialDataSession}>
      <AdminLayout>{children}</AdminLayout>
    </SessionAdminProvider>
  );
}
