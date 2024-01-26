import { LinkItemNavSettings } from './link/link-item-nav-settings';
import { type ItemNavSettingsProps } from '@/hooks/core/settings/use-settings-view';

export const ItemNavSettings = ({ icon, text, ...props }: ItemNavSettingsProps) => {
  const Icon = icon;

  return (
    <LinkItemNavSettings {...props}>
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </LinkItemNavSettings>
  );
};
