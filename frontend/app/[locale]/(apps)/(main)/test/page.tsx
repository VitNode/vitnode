import { lazy } from 'react';

export default function Page() {
  const code = 'commerce';
  const MarkdownPreview = lazy(() => import(`@/plugins/${code}/example`));

  return <MarkdownPreview />;
}
