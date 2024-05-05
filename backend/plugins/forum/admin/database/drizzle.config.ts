import { join } from "path";

import { defineConfig } from "drizzle-kit";

import { DATABASE_ENVS } from "@/plugins/database/client";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: join(__dirname, "schema"),
  out: join(__dirname, "migrations")
});
