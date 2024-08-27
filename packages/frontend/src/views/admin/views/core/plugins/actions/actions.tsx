import { CONFIG } from '@/helpers/config-with-env';

import { CreateActionPluginAdmin } from './create/create';
import { UploadActionPluginAdmin } from './upload';

export const ActionsPluginsAdmin = () => {
  return (
    <>
      {CONFIG.node_development && <UploadActionPluginAdmin />}
      <CreateActionPluginAdmin />
    </>
  );
};
