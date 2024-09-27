import { Core_GlobalQuery } from '@/graphql/queries/core_global.generated';
import React from 'react';

interface Args {
  config: Core_GlobalQuery['core_middleware__show'];
  defaultLanguage: string;
  languages: Core_GlobalQuery['core_languages__show']['edges'];
  settings: Core_GlobalQuery['core_settings__show'];
}

export const GlobalsContext = React.createContext<Args>({
  languages: [],
  defaultLanguage: '',
  settings: {} as Core_GlobalQuery['core_settings__show'],
  config: {} as Core_GlobalQuery['core_middleware__show'],
});

export const useGlobalData = () => React.useContext(GlobalsContext);
