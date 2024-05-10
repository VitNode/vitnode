import { lazy, type LazyExoticComponent } from "react";

import { getSessionData } from "@/functions/get-session-data";

export default async function Page() {
  const { theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<() => JSX.Element> = lazy(() =>
    import(`@/themes/${theme_id}/forum/default-page`).catch(
      () => import(`@/themes/1/forum/default-page`)
    )
  );

  return <PageFromTheme />;
}
