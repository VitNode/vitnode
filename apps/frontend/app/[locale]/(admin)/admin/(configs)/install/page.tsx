import { redirect } from "vitnode-frontend/navigation";

import { ErrorType, fetcher } from "@/graphql/fetcher";
import {
  Admin__Install__Layout,
  Admin__Install__LayoutQuery,
  Admin__Install__LayoutQueryVariables,
} from "@/graphql/hooks";
import { LayoutInstallConfigsView } from "@/plugins/admin/configs/views/install/layout-install-configs-view";
import { InternalErrorView } from "@/plugins/admin/global/internal-error/internal-error-view";

const getData = async () => {
  const { data } = await fetcher<
    Admin__Install__LayoutQuery,
    Admin__Install__LayoutQueryVariables
  >({
    query: Admin__Install__Layout,
    cache: "force-cache",
  });

  return data;
};

export default async function Page() {
  try {
    const data = await getData();

    return (
      <LayoutInstallConfigsView data={data.admin__install__layout.status} />
    );
  } catch (error) {
    const code = error as ErrorType;

    if (code.extensions?.code === "ACCESS_DENIED") {
      redirect("/admin");
    }

    return <InternalErrorView />;
  }
}
