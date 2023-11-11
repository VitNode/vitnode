import { ReactNode } from 'react';

import { LayoutConfigs } from '@/admin/configs/layout-configs';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <LayoutConfigs>{children}</LayoutConfigs>;
}
