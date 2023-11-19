'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Middleware_Core_Languages,
  Middleware_Core_LanguagesQuery,
  Middleware_Core_LanguagesQueryVariables
} from '@/graphql/hooks';
import { GlobalsContext } from '@/hooks/core/use-globals';

interface Props {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.LANGUAGES],
    queryFn: async () =>
      await fetcher<Middleware_Core_LanguagesQuery, Middleware_Core_LanguagesQueryVariables>({
        query: Middleware_Core_Languages
      })
  });

  return (
    <GlobalsContext.Provider
      value={{
        languages: data?.show_core_languages.edges.filter(item => item.enabled) ?? [],
        defaultLanguage: data?.show_core_languages.edges.find(item => item.default)?.id ?? 'en'
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};
