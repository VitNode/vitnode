"use client";

import * as React from "react";

import { ItemListNavAdmin } from "./item/item";
import { useSessionAdmin } from "@/admin/core/hooks/use-session-admin";

interface Props {
  onClickItem?: () => void;
}

export const ListNavAdmin = ({ onClickItem }: Props) => {
  const { nav } = useSessionAdmin();

  return (
    <div className="space-y-5">
      <ItemListNavAdmin
        id="core"
        onClickItem={onClickItem}
        items={[
          {
            id: "dashboard",
            href: "dashboard",
            icon: "LayoutDashboard"
          },
          {
            id: "settings",
            href: "settings/main",
            icon: "Settings"
          },
          {
            id: "plugins",
            href: "plugins",
            icon: "PlugIcon"
          },
          {
            id: "styles",
            href: "styles/themes",
            icon: "Paintbrush"
          },
          {
            id: "metadata",
            href: "metadata/manifest",
            icon: "Tag"
          },
          {
            id: "langs",
            href: "langs",
            icon: "Languages"
          },
          {
            id: "advanced",
            href: "advanced/files",
            icon: "Cog"
          }
        ]}
      />
      <ItemListNavAdmin
        id="members"
        onClickItem={onClickItem}
        items={[
          {
            id: "list",
            href: "users",
            icon: "Users"
          },
          {
            id: "groups",
            href: "groups",
            icon: "Group"
          },
          {
            id: "staff",
            href: "staff/moderators",
            icon: "UserCog"
          }
        ]}
      />
      {nav.map(item => (
        <ItemListNavAdmin
          key={item.code}
          id={item.code}
          onClickItem={onClickItem}
          items={item.nav.map(navItem => ({
            id: navItem.code,
            href: navItem.href,
            icon: navItem.icon ?? undefined
          }))}
        />
      ))}
    </div>
  );
};
