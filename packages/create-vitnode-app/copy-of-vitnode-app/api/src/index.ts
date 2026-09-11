import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { VitNodeAPI } from "@vitnode/core/api/config";
import { resolveApiConfig } from "@vitnode/core/config/server";

import vitNodeConfig from "./vitnode.config.js";

const app = new OpenAPIHono().basePath("/api");

VitNodeAPI({
  app,
  vitNodeApiConfig: await resolveApiConfig(vitNodeConfig, {
    appRoot: import.meta.dirname,
  }),
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  info => {
    const initMessage = "\x1b[34m[VitNode]\x1b[0m";

    // eslint-disable-next-line no-console
    console.log(
      `${initMessage} API server is running on http://localhost:${info.port}`,
    );
  },
);
