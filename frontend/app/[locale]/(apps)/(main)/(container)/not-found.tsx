import { lazy, type LazyExoticComponent } from 'react';

import { getSessionData } from '@/functions/get-session-data';
import type { ErrorViewProps } from '@/themes/1/core/views/global/error/error-view';

export default async function NotFoundPage() {
  const { theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<(props: ErrorViewProps) => JSX.Element> = lazy(() =>
    import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
      () => import('@/themes/1/core/views/global/error/error-view')
    )
  );

  return <PageFromTheme code="404" />;
}
