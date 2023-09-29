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

const getSession = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get(CONFIG.access_token) && !cookieStore.get(CONFIG.refresh_token)) {
    return;
  }

  try {
    return await fetcher<
      Authorization_Core_SessionsQuery,
      Authorization_Core_SessionsQueryVariables
    >({
      query: Authorization_Core_Sessions,
      headers: {
        Cookie: cookies().toString()
      }
    });
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function Layout({ children }: Props) {
  const Layout = lazy(() =>
    import(`@/themes/${CONFIG.default_theme}/core/layout/layout`).then(module => ({
      default: module.Layout
    }))
  );

  return (
    <SessionProvider initialDataSession={await getSession()}>
      <Layout>{children}</Layout>
    </SessionProvider>
  );
}
