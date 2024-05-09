// !! Do not remove and edit this file !!

import { defineConfig } from "drizzle-kit";

import { DATABASE_ENVS } from "@/plugins/database/client";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: "./plugins/core/admin/database/schema/*.ts",
  out: "./plugins/core/admin/database/migrations/"
});
