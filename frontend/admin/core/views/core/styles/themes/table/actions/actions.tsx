import { DeleteThemeActionsAdmin } from './delete/delete';

export interface ActionsItemThemesAdminProps {
  author: string;
  default: boolean;
  id: number;
  name: string;
  protected: boolean;
}

export const ActionsItemThemesAdmin = (props: ActionsItemThemesAdminProps) => {
  return <DeleteThemeActionsAdmin {...props} />;
};
