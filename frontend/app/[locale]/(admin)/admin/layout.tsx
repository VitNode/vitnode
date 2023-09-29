import { ReactNode } from 'react';

import '@/admin/layout/global.scss';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
