import { ReactNode } from 'react';

import { ConfigLayout } from '@/admin/configs/configs-layout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <ConfigLayout>{children}</ConfigLayout>;
}
