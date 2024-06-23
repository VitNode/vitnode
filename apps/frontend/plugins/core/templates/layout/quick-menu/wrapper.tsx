"use client";

import * as React from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "vitnode-frontend/navigation";

import { ItemQuickMenu } from "./item";

interface Props {
  children: React.ReactNode;
}

export const QuickMenuWrapper = ({ children }: Props) => {
  const t = useTranslations("core.mobile_nav");
  const pathname = usePathname();
  const { back } = useRouter();

  return (
    <>
      {pathname !== "/" && (
        <ItemQuickMenu onClick={back}>
          <ArrowLeft />
          <span>{t("back")}</span>
        </ItemQuickMenu>
      )}
      <ItemQuickMenu href="/search" active={pathname.startsWith("/search")}>
        <Search />
        <span>{t("search")}</span>
      </ItemQuickMenu>
      {/* {session && (
        <>
          <Drawer>
            <DrawerTrigger asChild>
              <ItemQuickMenu>
                <Bell />
                <span>{t("notifications")}</span>
              </ItemQuickMenu>
            </DrawerTrigger>

            <DrawerContent>
              <div className="p-5">Notifications - Not implemented!</div>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <ItemQuickMenu>
                <Mail />
                <span>{t("messages")}</span>
              </ItemQuickMenu>
            </DrawerTrigger>

            <DrawerContent>
              <div className="p-5">Messages - Not implemented!</div>
            </DrawerContent>
          </Drawer>
        </>
      )} */}
      {children}
    </>
  );
};
