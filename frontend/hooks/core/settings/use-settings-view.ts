import { Bell, Cog, Files, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

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
        href: "/settings/files",
        icon: Files,
        text: t("files.title")
      },
      {
        href: "/settings/notifications",
        icon: Bell,
        text: t("notifications.title")
      }
    ]
  };
};
