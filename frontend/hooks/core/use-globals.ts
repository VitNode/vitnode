import { createContext, useContext } from 'react';

import type { ShowCoreLanguages } from '@/graphql/hooks';

interface Args {
  defaultLanguage: string;
  languages: Omit<ShowCoreLanguages, 'protected'>[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: ''
});

export const useGlobals = () => useContext(GlobalsContext);
