import * as React from 'react';

import { ShowAdminNavPluginsObj } from '@/graphql/graphql';

interface Args {
  dataFromSSR: ShowAdminNavPluginsObj[];
  icons: { icon: React.ReactNode; id: string }[];
  parentId?: string;
}

export const ItemNavDevPluginAdminContext = React.createContext<Args>({
  dataFromSSR: [],
  icons: [],
});

export const useItemNavDevPluginAdmin = () =>
  React.useContext(ItemNavDevPluginAdminContext);
