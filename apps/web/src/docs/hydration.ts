import type { AnyRouter } from '@tanstack/react-router'

const DOCS_PAGE_ROUTE_ID = '/_docs/docs/$'

export interface DocsDehydratedState {
  docsPagePath?: string
}

const loaderPathOf = (loaderData: unknown): string | undefined => {
  if (typeof loaderData !== 'object' || loaderData === null) return undefined

  const { path } = loaderData as { path?: unknown }

  return typeof path === 'string' ? path : undefined
}

export const dehydrateDocsPage = (router?: AnyRouter): DocsDehydratedState => {
  const match = router?.state.matches.find(
    (candidate) => candidate.routeId === DOCS_PAGE_ROUTE_ID,
  )
  const docsPagePath = loaderPathOf(match?.loaderData)

  return docsPagePath ? { docsPagePath } : {}
}

export const hydrateDocsPage = async ({
  docsPagePath,
}: DocsDehydratedState): Promise<void> => {
  if (!docsPagePath) return

  const { docs } = await import('./source')

  await docs
    .getPage(docsPagePath)
    ?.preload()
    .catch(() => undefined)
}
