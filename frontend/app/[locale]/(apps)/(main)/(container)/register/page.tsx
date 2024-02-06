import { lazy, type LazyExoticComponent } from 'react';

import { getSessionData } from '@/functions/get-session-data';

export default async function Page() {
  const { theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<() => JSX.Element> = lazy(() =>
    import(`@/themes/${theme_id}/core/views/auth/sign/up/sign-up-view`).catch(
      () => import('@/themes/1/core/views/auth/sign/up/sign-up-view')
    )
  );

  return <PageFromTheme />;
}
