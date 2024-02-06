import { DeletePluginActionsAdmin } from "./delete/delete";

export interface ActionsItemPluginsAdminProps {
  author: string;
  code: string;
  default: boolean;
  name: string;
  protected: boolean;
}

export const ActionsItemPluginsAdmin = (
  props: ActionsItemPluginsAdminProps
) => {
  return <DeletePluginActionsAdmin {...props} />;
};
