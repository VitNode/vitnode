import { createFileRoute } from '@tanstack/react-router'
import { createFromSource } from 'fumadocs-core/search/server'

import { source } from '#/docs/source.server'

const docsSearch = createFromSource(source, { language: 'english' })

export const Route = createFileRoute('/docs/search')({
  server: {
    handlers: {
      GET: async ({ request }) => await docsSearch.GET(request),
    },
  },
})
