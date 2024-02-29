import type { Config } from "drizzle-kit";

const envs = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME
};

export default {
  schema: "./src/apps/admin/**/database/schema/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: envs.host ?? "localhost",
    port: envs.port ? +envs.port : 5432,
    user: envs.user ?? "root",
    password: envs.password ?? "root",
    database: envs.NAME ?? "vitnode"
  }
} satisfies Config;
