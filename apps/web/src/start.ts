import { createVitNodeStart } from '@vitnode/core/tanstack/start'

import { markdownNegotiationMiddleware } from '@/docs/markdown-negotiation'
import { vitNodePublicConfig } from '@/vitnode.public.gen'

export const startInstance = createVitNodeStart({
  config: vitNodePublicConfig,
  requestMiddleware: [markdownNegotiationMiddleware],
})
