import { CONFIG } from '@/helpers/config-with-env';

import { CreateActionPluginAdmin } from './create/create';
import { UploadActionPluginAdmin } from './upload';

export const ActionsPluginsAdmin = () => {
  return (
    <>
      <UploadActionPluginAdmin />
      {CONFIG.node_development && <CreateActionPluginAdmin />}
    </>
  );
};
