import { ReactNode, lazy } from 'react';
import { cookies } from 'next/headers';

import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_Sessions,
  Authorization_Core_SessionsQuery,
  Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionProvider } from './session-provider';
import { InternalErrorView } from '@/admin/views/global/internal-error-view';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

const getData = async () => {
  return await fetcher<Authorization_Core_SessionsQuery, Authorization_Core_SessionsQueryVariables>(
    {
      query: Authorization_Core_Sessions,
      headers: {
        Cookie: cookies().toString()
      }
    }
  );
};

export default async function Layout({ children }: Props) {
  try {
    const data = await getData();

    const Layout = lazy(() =>
      import(`@/themes/${CONFIG.default_theme}/core/layout/layout`).then(module => ({
        default: module.Layout
      }))
    );

    return (
      <SessionProvider initialData={data}>
        <Layout>{children}</Layout>
      </SessionProvider>
    );
  } catch (error) {
    return <InternalErrorView />;
  }
}
