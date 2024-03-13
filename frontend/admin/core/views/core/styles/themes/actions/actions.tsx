import { CONFIG } from "@/config";
import { CreateActionThemeAdmin } from "./create/create";
import { UploadActionThemeAdmin } from "./upload/upload";

export const ActionsThemesAdmin = () => {
  return (
    <>
      <UploadActionThemeAdmin />
      {CONFIG.node_development && <CreateActionThemeAdmin />}
    </>
  );
};
