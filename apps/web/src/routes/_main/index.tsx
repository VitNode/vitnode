import { createFileRoute } from '@tanstack/react-router'

import { HomeRouteContent } from '@/site/home/home-content'
import { MARKETING_PAGES, marketingHead } from '@/site/marketing/metadata'

export const Route = createFileRoute('/_main/')({
  head: () => marketingHead(MARKETING_PAGES.home),
  component: HomeRouteContent,
})
