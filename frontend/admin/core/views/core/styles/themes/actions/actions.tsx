import { CreateActionThemeAdmin } from './create/create';
import { UploadActionThemeAdmin } from './upload/upload';

export const ActionsThemesAdmin = () => {
  return (
    <>
      <UploadActionThemeAdmin />
      {process.env.NODE_ENV === 'development' && <CreateActionThemeAdmin />}
    </>
  );
};
