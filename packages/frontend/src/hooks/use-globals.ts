import * as React from 'react';

import { Core_GlobalQuery } from '../graphql/graphql';

interface Args {
  defaultLanguage: string;
  languages: Core_GlobalQuery['core_languages__show']['edges'];
  settings: Core_GlobalQuery['core_settings__show'];
  config: Core_GlobalQuery['core_middleware__show'];
}

export const GlobalsContext = React.createContext<Args>({
  languages: [],
  defaultLanguage: '',
  settings: {} as Core_GlobalQuery['core_settings__show'],
  config: {} as Core_GlobalQuery['core_middleware__show'],
});

export const useGlobals = () => React.useContext(GlobalsContext);
