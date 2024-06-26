import { ConfigType } from 'vitnode-shared';
import * as React from 'react';

import { Core_MiddlewareQuery } from '../graphql/hooks';

interface Args {
  config: ConfigType;
  defaultLanguage: string;
  languages: Core_MiddlewareQuery['core_languages__show']['edges'];
}

export const GlobalsContext = React.createContext<Args>({
  languages: [],
  defaultLanguage: '',
  config: {} as ConfigType,
});

export const useGlobals = () => React.useContext(GlobalsContext);
