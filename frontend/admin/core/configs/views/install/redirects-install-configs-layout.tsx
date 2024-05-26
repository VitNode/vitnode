"use client";

import { ReactNode, useEffect } from "react";

import {
  LayoutAdminInstallEnum,
  Admin__Install__LayoutQuery
} from "@/graphql/hooks";
import { FinishInstallConfigsView } from "./finish/finish-install-config-view";
import { usePathname, useRouter } from "@/utils/i18n";

interface Props {
  children: ReactNode;
  data: Admin__Install__LayoutQuery;
}

export const RedirectsInstallConfigsLayout = async ({
  children,
  data
}: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
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
