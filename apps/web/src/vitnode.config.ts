import { blogPlugin } from '@vitnode/blog/config'
import {
  defineApiRuntime,
  defineVitNodeConfig,
  defineWebRuntime,
} from '@vitnode/core/config'
import { coreRelations } from '@vitnode/core/database/relations'
import { examplePlugin } from '@vitnode/example/config'
import { SupabaseStorageAdapter } from '@vitnode/supabase-storage'
import { config as loadEnv } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'

import { appMessages } from './locales/app'
import { packageMessages } from './locales/packages'

export default defineVitNodeConfig({
  app: {
    i18n: {
      defaultLocale: 'en',
      locales: [
        { code: 'en', name: 'English' },
        { code: 'pl', name: 'Polski' },
      ],
      timeZone: 'UTC',
    },
    metadata: {
      shortTitle: 'VitNode',
      title: 'VitNode',
    },
  },

  plugins: [blogPlugin(), examplePlugin()],

  api: defineApiRuntime(({ env }) => {
    loadEnv({ quiet: true })

    return {
      dbProvider: drizzle({
        connection:
          env.POSTGRES_URL ?? 'postgresql://root:root@localhost:5432/vitnode',
        relations: coreRelations,
      }),
      redis: env.REDIS_URL
        ? { url: env.REDIS_URL, password: env.REDIS_PASSWORD }
        : undefined,
      storage: {
        adapter: SupabaseStorageAdapter({
          url: env.SUPABASE_URL,
          secretKey: env.SUPABASE_SECRET_KEY,
          bucket: env.SUPABASE_STORAGE_BUCKET,
        }),
        image: {
          quality: 85,
        },
      },
    }
  }),

  web: defineWebRuntime({
    public: {
      debug: false,
      editor: {
        emojis: [
          {
            emojis: [
              {
                name: 'vitnode',
                src: '/logo_vitnode_icon.svg',
                tags: ['logo', 'brand'],
              },
            ],
            label: 'VitNode',
          },
        ],
      },
      theme: {
        defaultTheme: 'system',
      },
    },

    server: () => ({ messages: appMessages, packageMessages }),
  }),
})
