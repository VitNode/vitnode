import { CreateActionsThemesAdmin } from './create/create';
import { UploadActionsThemesAdmin } from './upload/upload';

export const ActionsThemesAdmin = () => {
  return (
    <>
      <UploadActionsThemesAdmin />
      {process.env.NODE_ENV === 'development' && <CreateActionsThemesAdmin />}
    </>
  );
};
