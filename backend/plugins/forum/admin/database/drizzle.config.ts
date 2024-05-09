// !! Do not remove and edit this file !!

import { defineConfig } from "drizzle-kit";

import { DATABASE_ENVS } from "@/plugins/database/client";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: "./plugins/forum/admin/database/schema/*.ts",
  out: "./plugins/forum/admin/database/migrations/"
});
