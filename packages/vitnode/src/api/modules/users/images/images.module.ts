import { buildModule } from "@/api/lib/module";
import { CONFIG_PLUGIN } from "@/config";

import { deleteUserImageRoute } from "./routes/delete.route";
import { userImagePolicyRoute } from "./routes/policy.route";
import { uploadUserImageRoute } from "./routes/upload.route";

export const userImagesModule = buildModule({
  pluginId: CONFIG_PLUGIN.pluginId,
  name: "images",
  routes: [userImagePolicyRoute, uploadUserImageRoute, deleteUserImageRoute],
});
