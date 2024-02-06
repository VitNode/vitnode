import { lazy, type LazyExoticComponent } from 'react';

import { getSessionData } from '@/functions/get-session-data';

export default async function Page() {
  const { theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<() => JSX.Element> = lazy(() =>
    import(
      `@/themes/${theme_id}/core/views/settings/views/notifications/notifications-settings-view`
    ).catch(
      () => import('@/themes/1/core/views/settings/views/notifications/notifications-settings-view')
    )
  );

  return <PageFromTheme />;
}
