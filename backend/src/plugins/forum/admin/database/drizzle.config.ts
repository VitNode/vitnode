// !! Do not remove and edit this file !!

import { DATABASE_ENVS } from "@/database/client";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: "./src/plugins/forum/admin/database/schema/*.ts",
  out: "./src/plugins/forum/admin/database/migrations/"
});
