import type { ShowAdminThemes } from '@/graphql/hooks';
import { DeleteThemeActionsAdmin } from './delete/delete';
import { DownloadThemeActionsAdmin } from './download/download';

export interface ActionsItemThemesAdminProps
  extends Pick<
    ShowAdminThemes,
    'author' | 'default' | 'id' | 'name' | 'protected' | 'version' | 'version_code'
  > {}

export const ActionsItemThemesAdmin = (props: ActionsItemThemesAdminProps) => {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <DownloadThemeActionsAdmin {...props} />}
      <DeleteThemeActionsAdmin {...props} />
    </>
  );
};
