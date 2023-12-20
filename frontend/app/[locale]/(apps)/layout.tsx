import type { ReactNode } from 'react';
import { cookies } from 'next/headers';

import { LanguageProvider } from './language-provider';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Middleware,
  type Core_Languages__MiddlewareQuery,
  type Core_Languages__MiddlewareQueryVariables
} from '@/graphql/hooks';

const getData = async () => {
  const { data } = await fetcher<
    Core_Languages__MiddlewareQuery,
    Core_Languages__MiddlewareQueryVariables
  >({
    query: Core_Languages__Middleware,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

interface Props {
  children: ReactNode;
}

export default async function LocaleLayout({ children }: Props) {
  const data = await getData();

  return <LanguageProvider data={data}>{children}</LanguageProvider>;
}
