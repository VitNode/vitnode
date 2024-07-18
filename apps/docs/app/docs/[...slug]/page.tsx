import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { utils } from '@/utils/source';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = utils.getPage(params.slug);

  if (!page) notFound();

  if (page == null) {
    notFound();
  }

  const MDX = page.data.exports.default;

  return (
    <DocsPage toc={page.data.exports.toc} full={page.data.full}>
      <div className="space-y-2">
        <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
          {page.data.title}
        </h1>
        <p className="text-muted-foreground text-lg">{page.data.description}</p>
      </div>
      <DocsBody>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return getPages().map(page => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
