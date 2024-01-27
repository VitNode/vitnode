import { DeleteThemeActionsAdmin } from './delete/delete';
import { DownloadThemeActionsAdmin } from './download/download';

export interface ActionsItemThemesAdminProps {
  author: string;
  default: boolean;
  id: number;
  name: string;
  protected: boolean;
  version: string;
  version_code: number;
}

export const ActionsItemThemesAdmin = (props: ActionsItemThemesAdminProps) => {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <DownloadThemeActionsAdmin {...props} />}
      <DeleteThemeActionsAdmin {...props} />
    </>
  );
};
