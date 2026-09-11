import { google } from "@ai-sdk/google";
import { blogPlugin } from "@vitnode/blog/config";
import { DiscordSSOApiPlugin } from "@vitnode/core/api/adapters/sso/discord";
import { FacebookSSOApiPlugin } from "@vitnode/core/api/adapters/sso/facebook";
import { GoogleSSOApiPlugin } from "@vitnode/core/api/adapters/sso/google";
import { defineApiRuntime, defineVitNodeConfig } from "@vitnode/core/config";
import { coreRelations } from "@vitnode/core/database/relations";
import { examplePlugin } from "@vitnode/example/config";
import { NodeCronAdapter } from "@vitnode/node-cron";
import { NodemailerEmailAdapter } from "@vitnode/nodemailer";
import { SupabaseStorageAdapter } from "@vitnode/supabase-storage";
import { config as loadEnv } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineVitNodeConfig({
  app: {
    i18n: {
      defaultLocale: "en",
      locales: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" },
      ],
      timeZone: "UTC",
    },
    metadata: {
      shortTitle: "VitNode",
      title: "VitNode",
    },
  },

  plugins: [blogPlugin(), examplePlugin()],

  api: defineApiRuntime(({ env }) => {
    loadEnv({ quiet: true });

    return {
      ai: {
        models: [
          {
            id: "default",
            name: "Claude Sonnet 5",
            model: "anthropic/claude-sonnet-5",
          },
          {
            id: "fast",
            name: "Google Gemini 3.5 Flash Lite",
            model: google("gemini-3.5-flash-lite"),
          },
        ],
        embeddingModels: [
          {
            id: "default",
            name: "OpenAI text-embedding-3-small",
            model: "openai/text-embedding-3-small",
          },
        ],
      },
      dbProvider: drizzle({
        connection:
          env.POSTGRES_URL ?? "postgresql://root:root@localhost:5432/vitnode",
        relations: coreRelations,
      }),
      cron: NodeCronAdapter(),
      redis: env.REDIS_URL
        ? { url: env.REDIS_URL, password: env.REDIS_PASSWORD }
        : undefined,
      email: {
        adapter: NodemailerEmailAdapter({
          from: env.NODE_MAILER_FROM,
          host: env.NODE_MAILER_HOST,
          password: env.NODE_MAILER_PASSWORD,
          user: env.NOD_EMAILER_USER,
        }),
        logo: {
          text: "VitNode Email Test",
          src: "http://localhost:3000/logo_vitnode_dark.png",
        },
      },
      storage: {
        image: {
          quality: 85,
        },
        adapter: SupabaseStorageAdapter({
          url: env.SUPABASE_URL,
          secretKey: env.SUPABASE_SECRET_KEY,
          bucket: env.SUPABASE_STORAGE_BUCKET,
        }),
      },
      authorization: {
        ssoAdapters: [
          DiscordSSOApiPlugin({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
          }),
          GoogleSSOApiPlugin({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          }),
          FacebookSSOApiPlugin({
            clientId: env.FACEBOOK_CLIENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET,
          }),
        ],
      },
    };
  }),
});
