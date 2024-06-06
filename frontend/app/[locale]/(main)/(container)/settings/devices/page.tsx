import * as React from "react";
import { cookies } from "next/headers";

import { getSessionData } from "@/functions/get-session-data";
import {
  Core_Sessions__Devices__Show,
  Core_Sessions__Devices__ShowQuery,
  Core_Sessions__Devices__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { DevicesSettingsViewProps } from "@/themes/1/core/views/settings/views/devices/devices-settings-view";
import { fetcher } from "@/utils/graphql/fetcher";

const getData = async () => {
  const { data } = await fetcher<
    Core_Sessions__Devices__ShowQuery,
    Core_Sessions__Devices__ShowQueryVariables
  >({
    query: Core_Sessions__Devices__Show
  });

  return data;
};

export default async function Page() {
  const [{ theme_id }, data] = await Promise.all([getSessionData(), getData()]);
  const cookieStore = cookies();
  const loginToken = cookieStore.get("vitnode-login-token")?.value;

  if (!loginToken) {
    return null;
  }

  const PageFromTheme: React.LazyExoticComponent<
    (props: DevicesSettingsViewProps) => JSX.Element
  > = React.lazy(async () =>
    import(
      `../../../../../../themes/${theme_id}/core/views/settings/views/devices/devices-settings-view`
    ).catch(
      async () =>
        import(
          "../../../../../../themes/1/core/views/settings/views/devices/devices-settings-view"
        )
    )
  );

  return <PageFromTheme {...data} loginToken={loginToken} />;
}
