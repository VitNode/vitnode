"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { LayoutAdminInstallEnum } from "@/graphql/hooks";
import type { Admin__Install__LayoutQuery } from "@/graphql/hooks";
import { usePathname, useRouter } from "@/utils/i18n";
import { FinishInstallConfigsView } from "./finish/finish-install-config-view";

interface Props {
  children: ReactNode;
  data: Admin__Install__LayoutQuery;
}

export const RedirectsInstallConfigsLayout = ({ children, data }: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const redirectItems: {
      [key: string]: string;
    } = {
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

  return children;
};
