import { ReactNode } from 'react';

import { LayoutInstallConfigsView } from '@/admin/configs/views/install/layout-install-configs-view';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <LayoutInstallConfigsView>{children}</LayoutInstallConfigsView>;
}
