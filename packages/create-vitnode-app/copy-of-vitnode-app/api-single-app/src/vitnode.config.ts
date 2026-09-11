import {
  defineApiRuntime,
  defineVitNodeConfig,
  defineWebRuntime,
} from "@vitnode/core/config";
import { coreRelations } from "@vitnode/core/database/relations";
import { config as loadEnv } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";

import { appMessages } from "./locales/app";
import { packageMessages } from "./locales/packages";

export default defineVitNodeConfig({
  app: {
    i18n: {
      defaultLocale: "en",
      locales: [{ code: "en", name: "English" }],
      timeZone: "UTC",
    },
    metadata: {
      shortTitle: "VitNode",
      title: "VitNode",
    },
  },

  plugins: [],

  api: defineApiRuntime(({ env }) => {
    loadEnv({ quiet: true });

    return {
      dbProvider: drizzle({
        connection:
          env.POSTGRES_URL ?? "postgresql://root:root@localhost:5432/vitnode",
        relations: coreRelations,
      }),
      redis: env.REDIS_URL
        ? { url: env.REDIS_URL, password: env.REDIS_PASSWORD }
        : undefined,
    };
  }),

  web: defineWebRuntime({
    public: {
      debug: false,
      theme: {
        defaultTheme: "system",
      },
    },

    server: () => ({ messages: appMessages, packageMessages }),
  }),
});
