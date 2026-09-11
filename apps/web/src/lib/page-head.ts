import { createRouteHead } from '@vitnode/core/tanstack/metadata'

import { vitNodePublicConfig } from '@/vitnode.public.gen'

export const pageHead = createRouteHead(vitNodePublicConfig.metadata)
