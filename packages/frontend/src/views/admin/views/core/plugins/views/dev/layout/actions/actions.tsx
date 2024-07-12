'use client';

import { DownloadActionDevPluginAdmin } from './download/download';
import { ShowAdminPlugins } from '@/graphql/graphql';

export const ActionsDevPluginAdmin = (props: ShowAdminPlugins) => {
  return <DownloadActionDevPluginAdmin {...props} />;
};
