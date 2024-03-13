import { CONFIG } from "@/config";
import { CreateActionPluginAdmin } from "./create/create";
import { UploadActionPluginAdmin } from "./upload/upload";

export const ActionsPluginsAdmin = () => {
  return (
    <>
      <UploadActionPluginAdmin />
      {CONFIG.node_development && <CreateActionPluginAdmin />}
    </>
  );
};
