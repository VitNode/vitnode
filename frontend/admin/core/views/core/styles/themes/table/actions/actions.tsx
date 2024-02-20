import type { ShowAdminThemes } from "@/graphql/hooks";
import { DeleteThemeActionsAdmin } from "./delete/delete";
import { DownloadThemeActionsAdmin } from "./download/download";
import { EditThemeActionsAdmin } from "./edit/edit";

export interface ActionsItemThemesAdminProps
  extends Pick<
    ShowAdminThemes,
    | "author"
    | "default"
    | "id"
    | "name"
    | "protected"
    | "version"
    | "version_code"
    | "support_url"
    | "author_url"
  > {}

export const ActionsItemThemesAdmin = (props: ActionsItemThemesAdminProps) => {
  return (
    <>
      <DownloadThemeActionsAdmin {...props} />
      <EditThemeActionsAdmin {...props} />
      <DeleteThemeActionsAdmin {...props} />
    </>
  );
};
