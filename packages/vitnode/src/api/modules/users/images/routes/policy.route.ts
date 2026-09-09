import { HTTPException } from "hono/http-exception";

import { buildRoute } from "@/api/lib/route";
import {
  resolveUserImagePolicy,
  zodUserImagePolicy,
} from "@/api/lib/user-images";
import { CONFIG_PLUGIN } from "@/config";

export const userImagePolicyRoute = buildRoute({
  pluginId: CONFIG_PLUGIN.pluginId,
  route: {
    method: "get",
    description:
      "What the signed-in user may upload as an avatar and a cover, from their roles.",
    path: "/policy",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: zodUserImagePolicy,
          },
        },
        description: "Per-image allowance and size cap",
      },
      401: {
        description: "Not signed in",
      },
    },
  },
  handler: async c => {
    const user = c.get("user");
    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    return c.json(await resolveUserImagePolicy(c, user), 200);
  },
});
