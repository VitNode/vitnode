import { Cog, Files, LucideIcon, MonitorSmartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface ItemNavSettingsProps {
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
  text: string;
}

export interface LinkItemNavSettingsProps
  extends Omit<ItemNavSettingsProps, 'icon' | 'text'> {
  children: React.ReactNode;
}

interface ReturnValues {
  navItems: ItemNavSettingsProps[];
}

export const useSettingsView = (): ReturnValues => {
  const t = useTranslations('core.settings');

  return {
    navItems: [
      {
        href: '/settings',
        icon: Cog,
        text: t('overview.title'),
      },
      {
        href: '/settings/files',
        icon: Files,
        text: t('files.title'),
      },
      {
        href: '/settings/devices',
        icon: MonitorSmartphone,
        text: t('devices.title'),
      },
    ],
  };
};
