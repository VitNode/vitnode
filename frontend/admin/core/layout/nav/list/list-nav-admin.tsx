"use client";

import { ReactNode, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useSelectedLayoutSegments } from "next/navigation";

import { ItemListNavAdmin } from "./item/item";
import { cn } from "@/functions/classnames";
import { useSessionAdmin } from "@/admin/core/hooks/use-session-admin";

interface Props {
  children?: ReactNode;
  className?: string;
  onClickItem?: () => void;
}

export const ListNavAdmin = ({ children, className, onClickItem }: Props) => {
  const { nav } = useSessionAdmin();
  const segments = useSelectedLayoutSegments();
  const [activeItems, setActiveItems] = useState([segments.at(0) ?? "core"]);

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={activeItems}
      className={cn("flex flex-col", className)}
    >
      <ItemListNavAdmin
        id="core"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        onClickItem={onClickItem}
        items={[
          {
            id: "dashboard",
            href: "dashboard",
            icon: "LayoutDashboard"
          },
          {
            id: "settings",
            href: "settings",
            icon: "Settings"
          },
          {
            id: "plugins",
            href: "plugins",
            icon: "PlugIcon"
          },
          {
            id: "styles",
            href: "styles",
            icon: "Paintbrush"
          },
          {
            id: "metadata",
            href: "metadata",
            icon: "Tag"
          },
          {
            id: "langs",
            href: "langs",
            icon: "Languages"
          },
          {
            id: "advanced",
            href: "advanced",
            icon: "Cog"
          }
        ]}
      />
      <ItemListNavAdmin
        id="members"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
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
            href: "staff",
            icon: "UserCog"
          }
        ]}
      />
      {/* <ItemListNavAdmin
        id="forum"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        onClickItem={onClickItem}
        items={[
          {
            id: "forums",
            href: "/forums",
            icon: MessagesSquare
          }
        ]}
      /> */}
      {nav.map(item => (
        <ItemListNavAdmin
          key={item.code}
          id={item.code}
          activeItems={activeItems}
          setActiveItems={setActiveItems}
          onClickItem={onClickItem}
          items={item.nav.map(navItem => ({
            id: navItem.code,
            href: navItem.href,
            icon: navItem.icon ?? undefined
          }))}
        />
      ))}
      {children}
    </Accordion.Root>
  );
};
