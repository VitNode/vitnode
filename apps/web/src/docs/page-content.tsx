import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page'
import { use } from 'react'

import type { DocsPageData } from './transport'

import { getMDXComponents } from './mdx-components'
import { docs } from './source'

export const DocsPageContent = ({
  githubUrl,
  markdownUrl,
  path,
}: DocsPageData) => {
  const page = docs.getPage(path)

  if (!page) throw new Error(`Unknown docs page: ${path}`)

  const { toc } = use(page.load())
  const MDX = page.body

  return (
    <DocsPage tableOfContent={{ single: false, style: 'clerk' }} toc={toc}>
      <DocsTitle className="text-balance">{page.title}</DocsTitle>
      <DocsDescription className="text-pretty">
        {page.description}
      </DocsDescription>

      <div className="border-b pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover githubUrl={githubUrl} markdownUrl={markdownUrl} />
        </div>
      </div>

      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}
