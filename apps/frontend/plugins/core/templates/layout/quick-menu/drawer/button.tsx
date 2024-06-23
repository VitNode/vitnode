"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Drawer, DrawerTrigger } from "vitnode-frontend/components";

import { ItemQuickMenu } from "../item";
import { useSession } from "@/plugins/core/hooks/use-session";
import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { DrawerQuickMenu } from "./drawer";

interface Props {
  navIcons: { icon: React.ReactNode; id: number }[];
}

export const ButtonDrawer = ({ navIcons }: Props) => {
  const t = useTranslations("core.mobile_nav");
  const { session } = useSession();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ItemQuickMenu>
          {session ? <AvatarUser user={session} sizeInRem={1.5} /> : <Menu />}
          <span>{t("menu")}</span>
        </ItemQuickMenu>
      </DrawerTrigger>

      <DrawerQuickMenu navIcons={navIcons} />
    </Drawer>
  );
};
