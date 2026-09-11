import { defineVitNodeDrizzleConfig } from "@vitnode/core/drizzle.config";

import vitNodeConfig from "./src/vitnode.config";

export default defineVitNodeDrizzleConfig({
  config: vitNodeConfig,
  out: "./migrations/",
});
