import { cookies } from "next/headers";

import { SettingsCoreAdminView } from "@/admin/core/views/core/settings/settings-core-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Settings__General__Show,
  type Admin__Settings__General__ShowQuery,
  type Admin__Settings__General__ShowQueryVariables
} from "@/graphql/hooks";

const getData = async () => {
  const { data } = await fetcher<
    Admin__Settings__General__ShowQuery,
    Admin__Settings__General__ShowQueryVariables
  >({
    query: Admin__Settings__General__Show,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

export default async function Page() {
  const data = await getData();

  return <SettingsCoreAdminView {...data} />;
}
