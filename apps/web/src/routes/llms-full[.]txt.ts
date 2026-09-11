import { createFileRoute } from '@tanstack/react-router'

import { getLLMText, source } from '@/docs/source.server'

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        const pages = await Promise.all(source.getPages().map(getLLMText))

        return new Response(pages.join('\n\n'), {
          headers: { 'content-type': 'text/plain; charset=utf-8' },
        })
      },
    },
  },
})
