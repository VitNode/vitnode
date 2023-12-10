'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Middleware,
  Core_Languages__MiddlewareQuery,
  Core_Languages__MiddlewareQueryVariables
} from '@/graphql/hooks';
import { GlobalsContext } from '@/hooks/core/use-globals';

interface Props {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.LANGUAGES],
    queryFn: async () =>
      await fetcher<Core_Languages__MiddlewareQuery, Core_Languages__MiddlewareQueryVariables>({
        query: Core_Languages__Middleware
      })
  });

  return (
    <GlobalsContext.Provider
      value={{
        languages: data?.core_languages__show.edges.filter(item => item.enabled) ?? [],
        defaultLanguage: data?.core_languages__show.edges.find(item => item.default)?.id ?? 'en'
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};
