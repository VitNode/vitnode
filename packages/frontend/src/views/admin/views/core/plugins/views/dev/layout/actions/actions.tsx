'use client';

import { DownloadActionDevPluginAdmin } from './download/download';

import { ShowAdminPlugins } from '../../../../../../../../../graphql/code';

export const ActionsDevPluginAdmin = (props: ShowAdminPlugins) => {
  return <DownloadActionDevPluginAdmin {...props} />;
};
