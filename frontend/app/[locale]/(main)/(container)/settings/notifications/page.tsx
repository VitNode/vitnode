import * as React from "react";

import { getSessionData } from "@/functions/get-session-data";

export default async function Page() {
  const { theme_id } = await getSessionData();
  const PageFromTheme: React.LazyExoticComponent<() => JSX.Element> =
    React.lazy(async () =>
      import(
        `@/themes/${theme_id}/core/views/settings/views/notifications/notifications-settings-view`
      ).catch(
        async () =>
          import(
            "@/themes/1/core/views/settings/views/notifications/notifications-settings-view"
          )
      )
    );

  return <PageFromTheme />;
}
