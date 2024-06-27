import { ItemNavSettingsProps } from '../hooks/use-settings-view';
import { LinkItemNavSettings } from './link/link-item-nav-settings';

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
