import { LinkItemNavSettings } from "./link/link-item-nav-settings";
import { ItemNavSettingsProps } from "@/plugins/core/hooks/settings/use-settings-view";

export const ItemNavSettings = ({
  icon,
  text,
  ...props
}: ItemNavSettingsProps) => {
  const Icon = icon;

  return (
    <LinkItemNavSettings {...props}>
      <Icon className="size-5" />
      <span>{text}</span>
    </LinkItemNavSettings>
  );
};
