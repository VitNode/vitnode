import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { DocsPageContent } from '@/docs/page-content'
import { DocsPagePendingSkeleton } from '@/docs/pending'
import { DOCS_STALE_TIME } from '@/docs/shared'
import { getDocsPage } from '@/docs/transport'
import { pageHead } from '@/lib/page-head'

export const Route = createFileRoute('/_docs/docs/$')({
  loader: async ({ params }) => {
    const page = await getDocsPage({ data: params._splat ?? '' })
    const { docs } = await import('@/docs/source')

    await docs.getPage(page.path)?.preload()

    return page
  },
  head: ({ loaderData }) =>
    pageHead({
      description: loaderData?.description,
      openGraph: {
        description: loaderData?.description,
        title: loaderData?.metaTitle,
        type: 'article',
      },
      robots: 'index, follow',
      title: loaderData?.metaTitle,
    }),
  staleTime: DOCS_STALE_TIME,
  component: DocsRoute,
  pendingComponent: DocsPagePendingSkeleton,
})

function DocsRoute() {
  return (
    <Suspense fallback={<DocsPagePendingSkeleton />}>
      <DocsPageContent {...Route.useLoaderData()} />
    </Suspense>
  )
}
