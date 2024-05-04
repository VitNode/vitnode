import { defineConfig } from "drizzle-kit";

import { DATABASE_ENVS } from "./plugins/database/client";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: "./plugins/**/database/schema/*.ts",
  out: "./drizzle"
});
