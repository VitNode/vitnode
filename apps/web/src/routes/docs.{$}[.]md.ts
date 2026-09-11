import { createFileRoute } from '@tanstack/react-router'

import { decodeMarkdownUrl } from '@/docs/shared'
import { getLLMText, source } from '@/docs/source.server'

export const Route = createFileRoute('/docs/{$}.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugs = decodeMarkdownUrl(params._splat?.split('/') ?? [])
        const page = source.getPage(slugs)

        if (!page) return new Response('Not Found', { status: 404 })

        return new Response(await getLLMText(page), {
          headers: { 'content-type': 'text/markdown; charset=utf-8' },
        })
      },
    },
  },
})
