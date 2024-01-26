import type { ReactNode } from 'react';

import { StaffAdminLayout } from '@/admin/core/views/members/staff/staff-admin-layout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <StaffAdminLayout>{children}</StaffAdminLayout>;
}
