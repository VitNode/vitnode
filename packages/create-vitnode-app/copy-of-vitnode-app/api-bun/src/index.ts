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

export default {
  port: 8000,
  fetch: app.fetch,
};
