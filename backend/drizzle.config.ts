import { DATABASE_ENVS } from "@/database/client";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: "./src/plugins/**/database/schema/*.ts"
});
