'use client';

import type { ReactNode } from 'react';

import type { Core_Languages__MiddlewareQuery } from '@/graphql/hooks';
import { GlobalsContext } from '@/hooks/core/use-globals';

interface Props {
  children: ReactNode;
  data: Core_Languages__MiddlewareQuery;
}

export const LanguageProvider = ({ children, data }: Props) => {
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
