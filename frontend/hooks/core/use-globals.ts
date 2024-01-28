import { createContext, useContext } from 'react';

import type { LanguageCoreMiddlewareObj } from '@/graphql/hooks';

interface Args {
  defaultLanguage: string;
  languages: Omit<LanguageCoreMiddlewareObj, 'protected'>[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: ''
});

export const useGlobals = () => useContext(GlobalsContext);
