import type { ShowAdminThemes } from "@/graphql/hooks";
import { DeleteThemeActionsAdmin } from "./delete/delete";
import { DownloadThemeActionsAdmin } from "./download/download";
import { EditThemeActionsAdmin } from "./edit/edit";
import { UploadThemeActionsAdmin } from "./upload";

export const ActionsItemThemesAdmin = (props: ShowAdminThemes) => {
  return (
    <>
      <DownloadThemeActionsAdmin {...props} />
      <UploadThemeActionsAdmin {...props} />
      <EditThemeActionsAdmin {...props} />
      <DeleteThemeActionsAdmin {...props} />
    </>
  );
};
