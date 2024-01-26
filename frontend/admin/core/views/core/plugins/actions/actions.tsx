import { CreateActionsPluginsAdmin } from './create/create';
import { UploadActionsPluginsAdmin } from './upload/upload';

export const ActionsPluginsAdmin = () => {
  return (
    <>
      <UploadActionsPluginsAdmin />
      {process.env.NODE_ENV === 'development' && <CreateActionsPluginsAdmin />}
    </>
  );
};
