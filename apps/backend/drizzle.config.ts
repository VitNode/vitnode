import { defineConfig } from "drizzle-kit";

import { DATABASE_ENVS } from "@/database/client";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    ...DATABASE_ENVS,
    ssl: false,
  },
  schema: "./src/plugins/**/admin/database/schema/*.ts",
});
