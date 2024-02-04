import { CreateActionPluginAdmin } from './create/create';
import { UploadActionPluginAdmin } from './upload/upload';

export const ActionsPluginsAdmin = () => {
  return (
    <>
      <UploadActionPluginAdmin />
      {process.env.NODE_ENV === 'development' && <CreateActionPluginAdmin />}
    </>
  );
};
