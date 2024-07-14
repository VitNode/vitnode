import React from 'react';
import {
  LayoutSettingsView,
  generateMetadataLayoutSettings,
} from 'vitnode-frontend/theme-tsx/settings/layout-settings-view';

export const generateMetadata = generateMetadataLayoutSettings;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutSettingsView>{children}</LayoutSettingsView>;
}
