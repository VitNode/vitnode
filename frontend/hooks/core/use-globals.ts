import { createContext, useContext } from 'react';

import { ShowCoreLanguages } from '@/graphql/hooks';

interface Args {
  languages: Omit<ShowCoreLanguages, 'protected'>[];
}

export const GlobalsContext = createContext<Args>({
  languages: []
});

export const useGlobals = () => useContext(GlobalsContext);
