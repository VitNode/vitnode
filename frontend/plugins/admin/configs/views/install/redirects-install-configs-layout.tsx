"use client";

import * as React from "react";
import { usePathname, useRouter } from "@vitnode/frontend/navigation";

import {
  LayoutAdminInstallEnum,
  Admin__Install__LayoutQuery
} from "@/graphql/hooks";
import { FinishInstallConfigsView } from "./finish/finish-install-config-view";

interface Props {
  children: React.ReactNode;
  data: Admin__Install__LayoutQuery;
}

export const RedirectsInstallConfigsLayout = async ({
  children,
  data
}: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const redirectItems: Record<string, string> = {
      [LayoutAdminInstallEnum.database]: "/admin/install",
      [LayoutAdminInstallEnum.account]: "/admin/install/account"
    };

    const path = redirectItems[data.admin__install__layout.status];

    if (path && path !== pathname) {
      replace(path);
    }
  }, [data]);

  if (data.admin__install__layout.status === LayoutAdminInstallEnum.finish) {
    return <FinishInstallConfigsView />;
  }

  return <>{children}</>;
};
