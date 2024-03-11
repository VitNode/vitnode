import type { ShowAdminPlugins } from "@/graphql/hooks";
import { DeletePluginActionsAdmin } from "./delete/delete";
import { DownloadPluginActionsAdmin } from "./download/download";
import { EditPluginActionsAdmin } from "./edit";

export const ActionsItemPluginsAdmin = (props: ShowAdminPlugins) => {
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <>
          <DownloadPluginActionsAdmin {...props} />
          <EditPluginActionsAdmin {...props} />
        </>
      )}
      <DeletePluginActionsAdmin {...props} />
    </>
  );
};
