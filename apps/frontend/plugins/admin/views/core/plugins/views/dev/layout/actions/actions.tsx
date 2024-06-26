'use client';

import { ShowAdminPlugins } from '@/graphql/hooks';
import { DownloadActionDevPluginAdmin } from './download/download';

export const ActionsDevPluginAdmin = (props: ShowAdminPlugins) => {
  return <DownloadActionDevPluginAdmin {...props} />;
};
