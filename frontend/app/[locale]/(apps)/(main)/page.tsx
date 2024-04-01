import { lazy, type LazyExoticComponent } from "react";

import { getSessionData } from "@/functions/get-session-data";

interface DynamicImport extends Promise<{ default: () => JSX.Element }> {}

export default async function Page(): Promise<JSX.Element> {
  const { default_plugin, theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<() => JSX.Element> = lazy(
    (): DynamicImport =>
      import(`@/themes/${theme_id}/${default_plugin}/default-page`).catch(
        (): DynamicImport => import(`@/themes/1/${default_plugin}/default-page`)
      )
  );

  return <PageFromTheme />;
}
