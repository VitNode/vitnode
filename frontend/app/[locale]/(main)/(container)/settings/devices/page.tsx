import * as React from "react";
import { cookies } from "next/headers";

import {
  Core_Sessions__Devices__Show,
  Core_Sessions__Devices__ShowQuery,
  Core_Sessions__Devices__ShowQueryVariables
} from "@/graphql/hooks";
import { DevicesSettingsView } from "@/plugins/core/views/views/settings/views/devices/devices-settings-view";
import { fetcher } from "@/graphql/fetcher";

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
  const data = await getData();
  const cookieStore = cookies();
  const loginToken = cookieStore.get("vitnode-login-token")?.value;

  if (!loginToken) {
    return null;
  }

  return <DevicesSettingsView {...data} loginToken={loginToken} />;
}
