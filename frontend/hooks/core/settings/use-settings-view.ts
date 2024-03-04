import { Bell, Cog, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

export interface ItemNavSettingsProps {
  href: string;
  icon: LucideIcon;
  text: string;
  onClick?: () => void;
}

export interface LinkItemNavSettingsProps
  extends Omit<ItemNavSettingsProps, "icon" | "text"> {
  children: ReactNode;
}

interface ReturnValues {
  navItems: ItemNavSettingsProps[];
}

export const useSettingsView = (): ReturnValues => {
  const t = useTranslations("core.settings");

  return {
    navItems: [
      {
        href: "/settings",
        icon: Cog,
        text: t("overview.title")
      },
      {
        href: "/settings/notifications",
        icon: Bell,
        text: t("notifications.title")
      }
    ]
  };
};
