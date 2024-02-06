"use client";

import { Bell, Home, Mail, Menu, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { ItemQuickMenu } from "./item";
import { usePathname } from "@/i18n";
import { useSession } from "@/hooks/core/use-session";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DrawerQuickMenu } from "./drawer/drawer";
import { AvatarUser } from "@/components/user/avatar/avatar-user";

export const QuickMenu = () => {
  const t = useTranslations("core.mobile_nav");
  const pathname = usePathname();
  const { session } = useSession();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed bottom-0 z-50 w-full border-t bg-card/75 backdrop-blur sm:hidden flex">
      <ItemQuickMenu active={pathname === "/"} href="/">
        <Home />
        <span>{t("home")}</span>
      </ItemQuickMenu>

      <ItemQuickMenu href="/search" active={pathname.startsWith("/search")}>
        <Search />
        <span>{t("search")}</span>
      </ItemQuickMenu>

      {session && (
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
      )}

      <Drawer>
        <DrawerTrigger asChild>
          <ItemQuickMenu>
            {session ? <AvatarUser user={session} sizeInRem={1.5} /> : <Menu />}
            <span>{t("menu")}</span>
          </ItemQuickMenu>
        </DrawerTrigger>

        <DrawerQuickMenu />
      </Drawer>
    </div>
  );
};
