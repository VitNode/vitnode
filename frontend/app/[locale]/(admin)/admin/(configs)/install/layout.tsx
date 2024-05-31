import * as React from "react";

import {
  Admin__Install__Layout,
  Admin__Install__LayoutQuery,
  Admin__Install__LayoutQueryVariables
} from "@/utils/graphql/hooks";
import { redirect } from "@/utils/i18n";
import { fetcher, ErrorType } from "@/utils/graphql/fetcher";
import { LayoutInstallConfigsView } from "@/plugins/core/admin/configs/views/install/layout-install-configs-view";
import { InternalErrorView } from "@/plugins/core/admin/global/internal-error/internal-error-view";
import { RedirectsInstallConfigsLayout } from "@/plugins/core/admin/configs/views/install/redirects-install-configs-layout";

interface Props {
  children: React.ReactNode;
}

const getData = async () => {
  const { data } = await fetcher<
    Admin__Install__LayoutQuery,
    Admin__Install__LayoutQueryVariables
  >({
    query: Admin__Install__Layout
  });

  return data;
};

export default async function Layout({ children }: Props) {
  try {
    const data = await getData();

    return (
      <RedirectsInstallConfigsLayout data={data}>
        <LayoutInstallConfigsView>{children}</LayoutInstallConfigsView>
      </RedirectsInstallConfigsLayout>
    );
  } catch (error) {
    const code = error as ErrorType;

    if (code.extensions?.code === "ACCESS_DENIED") {
      redirect("/admin");
    }

    return <InternalErrorView />;
  }
}
