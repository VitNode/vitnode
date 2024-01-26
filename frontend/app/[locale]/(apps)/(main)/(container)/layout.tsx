import type { ReactNode } from 'react';

import { ContainerLayout } from '@/themes/1/core/layout/container-layout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <ContainerLayout>{children}</ContainerLayout>;
}
