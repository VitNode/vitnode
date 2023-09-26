import { ReactNode } from 'react';

import { AdminLayout } from '@/admin/layout/admin-layout';

import '@/admin/layout/global.scss';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function Layout({ children }: Props) {
  return <AdminLayout>{children}</AdminLayout>;
}
