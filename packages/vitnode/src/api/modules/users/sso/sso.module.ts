import { buildModule } from "@/api/lib/module";
import { CONFIG_PLUGIN } from "@/config";

import { callbackRoute } from "./routes/callback.route";
import { createUrlRoute } from "./routes/create-url.route";
import { linkRoute } from "./routes/link.route";

export const ssoUserModule = buildModule({
  pluginId: CONFIG_PLUGIN.pluginId,
  name: "sso",
  routes: [callbackRoute, createUrlRoute, linkRoute],
});
