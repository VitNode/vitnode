import type { ReactNode } from 'react';

import { LayoutSettingsView } from '@/themes/default/core/views/settings/layout-settings-view';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <LayoutSettingsView>{children}</LayoutSettingsView>;
}
