'use client';

import { ShowAdminPlugins } from '@/graphql/types';

import { DownloadActionDevPluginAdmin } from './download/download';

export const ActionsDevPluginAdmin = (props: ShowAdminPlugins) => {
  return <DownloadActionDevPluginAdmin {...props} />;
};
