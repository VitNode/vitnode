import '@tanstack/react-start/server-only'
import { OpenAPIHono } from '@hono/zod-openapi'
import { VitNodeAPI } from '@vitnode/core/api/config'
import { resolveApiConfig } from '@vitnode/core/config/server'

import { createApiBridge } from '@/server/api-bridge'
import vitNodeConfig from '@/vitnode.config'

const createVitNodeApi = async () => {
  const app = new OpenAPIHono().basePath('/api')

  VitNodeAPI({ app, vitNodeApiConfig: await resolveApiConfig(vitNodeConfig) })

  return app
}

const cache = globalThis as typeof globalThis & {
  __vitnodeApi?: ReturnType<typeof createVitNodeApi>
}

export const vitNodeApi = (cache.__vitnodeApi ??= createVitNodeApi())

export const apiBridge = createApiBridge(vitNodeApi)
