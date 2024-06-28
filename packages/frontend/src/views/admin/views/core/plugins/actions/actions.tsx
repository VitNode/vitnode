import { CreateActionPluginAdmin } from './create/create';
import { UploadActionPluginAdmin } from './upload';

import { CONFIG } from '../../../../../../helpers/config-with-env';

export const ActionsPluginsAdmin = () => {
  return (
    <>
      <UploadActionPluginAdmin />
      {CONFIG.node_development && <CreateActionPluginAdmin />}
    </>
  );
};
