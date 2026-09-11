import { createFileRoute } from '@tanstack/react-router'

import { MARKETING_PAGES, marketingHead } from '@/site/marketing/metadata'
import { PluginsBreadcrumb } from '@/site/plugins/breadcrumb'
import { PluginsPage } from '@/site/plugins/plugins-page'

export const Route = createFileRoute('/_main/plugins')({
  head: () => marketingHead(MARKETING_PAGES.plugins),
  staticData: { breadcrumb: <PluginsBreadcrumb /> },
  component: PluginsPage,
})
