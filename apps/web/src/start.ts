import { createVitNodeStart } from '@vitnode/core/tanstack/start'

import { markdownNegotiationMiddleware } from '@/docs/markdown-negotiation'
import { vitNodeConfig } from '@/vitnode.config'

export const startInstance = createVitNodeStart({
  config: vitNodeConfig,
  requestMiddleware: [markdownNegotiationMiddleware],
})
